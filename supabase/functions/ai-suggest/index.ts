// Proxies a single prompt to the real Anthropic API, so the public (no-login)
// copy of Choose My Meal can still use "Neither of those?" and the recipe-link
// autofill -- the public page can never safely hold the real API key itself.
//
// Deploy via the Supabase Dashboard: Edge Functions -> New Function -> name it
// "ai-suggest" -> paste this file's contents -> Deploy. Then set the secret:
// Edge Functions -> Secrets -> add ANTHROPIC_API_KEY (the same key
// add_recipe_gui.py uses locally). See chosemymeal/README.md for the full
// walkthrough.
//
// Deliberately minimal: no rate limiting beyond a short prompt-length cap and
// a small max_tokens -- this is a two-person family app on an unlisted link,
// not a public product. If the link ever spreads further, add real rate
// limiting before that becomes a real cost risk.

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MODEL = "claude-haiku-4-5-20251001"; // fast + cheap, plenty for this
const MAX_PROMPT_CHARS = 8000;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  let prompt;
  try {
    const body = await req.json();
    prompt = body?.prompt;
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  if (typeof prompt !== "string" || !prompt || prompt.length > MAX_PROMPT_CHARS) {
    return json({ error: "bad_request" }, 400);
  }

  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    return json({ error: "not_configured" }, 500);
  }

  let upstream;
  try {
    upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });
  } catch {
    return json({ error: "upstream_unreachable" }, 502);
  }

  if (upstream.status === 429) return json({ error: "rate_limited" }, 429);
  if (!upstream.ok) return json({ error: "upstream_error" }, 502);

  const data = await upstream.json();
  const text = data?.content?.[0]?.text ?? "";
  return json({ text });
});

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "content-type": "application/json" },
  });
}
