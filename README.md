# Choose My Meal

Chessy & Duffy's dinner decider. Answer four quick questions and get two dinner ideas. If you don't fancy either, tell Claude what you're after.

Lives in two places from the same source files:
- **The public link** — `frpike.github.io/chosemymeal` (GitHub Pages, from the separate `frpike/chosemymeal` repo) — anyone with the link can open it, no account needed. This is the one to add to a phone's home screen.
- **The claude.ai page** — still published from here too, for whoever's signed in. Both read and write the same shared "Add a recipe" data (Supabase, see below), so an add on one shows up on the other.

## How it works

1. **When?** Day and current time are filled in for you. Pick how long you've got.
2. **Vibe?** *Weekend night* (new & exciting), *Chill* (one of our favourites) or *New but easy*.
3. **Whose kitchen?** At Duffy's (stock cubes, spices, oven and hob only), shorter shopping lists win and recipes needing a blender or sushi mat drop down. Each card shows what to buy.
4. **Protein?** Chicken, lamb, pork, chorizo, fish, prawns/seafood, or surprise us. Chorizo also picks up dishes like chicken & chorizo orzo. Beef is never suggested.

You get two suggestions, picked to be different from each other. **Shuffle** re-rolls them, and **🎲 Just pick for us** skips the questions. **We'll cook this!** keeps that dish out of the next few suggestions (remembered on that phone).

**Neither of those?** Type what you want (e.g. "something spicy with leeks, no oven") and Claude suggests another recipe with a source link. Claude can't browse the web, so it prefers the recipes in our list, which have checked links. Every idea also has a *Search for this recipe* link in case a link is wrong. Works on both the claude.ai page (asks the viewer's own Claude, free) and the public link (asks a small Edge Function instead, see below) — if neither is available it falls back to *Copy request for Claude*, paste it in yourself.

**➕ Add a recipe** saves a reel or recipe to the shared list and it goes into the suggestions straight away, live on both the public link and the claude.ai page — no sharing/permissions to set up, that's handled by the Supabase setup below. Paste the link and hit **✨ Try to fill this in** first — Claude can't actually open the link either way, but if it already knows the recipe from training it'll fill in what it can, on either surface. Always check the result before saving; a reel or anything less well-known will usually come back unrecognised, and you fill it in yourself same as before.

⚠️ tags mean the recipe *as written* has dairy or sesame, so swap before cooking.

## Files

- `index.html` is the app.
- `recipes.js` has all the recipes: `favourites` (our usual mains) and `newIdeas` (new recipes, each with a source link). `favourites` itself is two things stitched together — `RECIPES_FROM_COOKBOOK` (below) and `RECIPES_EXTRA`, a small hand-edited list for dinners we cook a lot that don't have a cookbook page yet. To add one permanently to `newIdeas` or `RECIPES_EXTRA`, copy an existing entry and edit it. The fields are explained at the top of the file.

## Keeping it in sync with the cookbook

`favourites` shouldn't be hand-typed twice — most of it already exists as real pages in `../recipes/`. Whenever you've added or changed a cookbook recipe in the `mains` or `one-pot` chapters:

```
node tools/sync-recipes.js
```

This reads `../recipes/*.md` and `../chapters.txt` straight from the cookbook, and regenerates the `RECIPES_FROM_COOKBOOK` block in `recipes.js` (marked auto-generated — don't hand-edit it, the next sync overwrites it). Details the cookbook file doesn't have — protein, cuisine, kit, dairy/sesame, a short shopping list — come from `tools/cookbook-tags.json`, keyed by recipe number. A cookbook recipe in scope but missing from that file gets printed as a warning and left out of the suggestions until you tag it, rather than guessed at.

**This also happens on its own.** `/add-recipe` and `/cooked-it` (see `CLAUDE.md`) run this sync, the bundle+publish below, and the commit automatically as their last step whenever the new recipe lands in `mains` or `one-pot` — there's nothing to do by hand except tag a brand-new recipe in `cookbook-tags.json` if it warns you to. The commands above are there for anything those don't cover: editing an existing recipe's tags, or a recipe added some other way.

## Shared add-recipe (Supabase)

The "Add a recipe" list is stored in a free Supabase project, not claude.ai's database — that's what lets the public, no-login copy save and see the same list as the claude.ai page. One-time setup:

1. Create a free project at [supabase.com](https://supabase.com) (no card needed).
2. In the SQL editor, run:
   ```sql
   create table recipes (
     id uuid primary key default gen_random_uuid(),
     name text not null,
     url text,
     protein text,
     mins int,
     one_pot boolean default false,
     kind text,
     ing jsonb default '[]'::jsonb,
     loves boolean default false,
     source text,
     added_at timestamptz not null default now()
   );
   alter table recipes enable row level security;
   create policy "public read" on recipes for select using (true);
   create policy "public insert" on recipes for insert with check (true);
   alter publication supabase_realtime add table recipes;
   ```
   This is deliberately wide open (anyone can read and add, nobody can edit or delete) — fine for a low-stakes recipe list on a link that isn't advertised anywhere.
3. In Project Settings → API, copy the **Project URL** and the **anon public key**.
4. Paste both into `index.html`, replacing `SUPABASE_URL` and `SUPABASE_ANON_KEY` near the top of the `<script>` block. The anon key is meant to be public (it's only as powerful as the policies above), unlike the Anthropic key `add_recipe_gui.py` uses.

Until those two placeholders are replaced, "Add a recipe" just shows a message saying so — everything else in the app works regardless.

## AI on the public link (Edge Function)

"Neither of those?" and the recipe-link autofill need to ask a real Claude somewhere. On the claude.ai page that's free — it asks the viewer's own Claude. The public link has no such thing, so it calls a small Supabase Edge Function instead, which holds a real Anthropic API key server-side (the page itself never sees it). One-time setup, same Supabase project as above:

1. In the Supabase dashboard: **Edge Functions → New Function**, name it `ai-suggest`, and paste in the contents of `supabase/functions/ai-suggest/index.ts`. Deploy.
2. **Edge Functions → Secrets**, add `ANTHROPIC_API_KEY` — reuse the same key `add_recipe_gui.py` already uses locally (Settings → API keys at console.anthropic.com). This does mean the public link's usage bills to that same key.
3. That's it — `index.html` already calls `${SUPABASE_URL}/functions/v1/ai-suggest`, no further changes needed.

Worth knowing: this function is deliberately simple — a prompt-length cap and a small `max_tokens`, nothing more. It's fine for a two-person app on a link that isn't published anywhere, but if the link ever spreads further than intended, anyone who has it could trigger (billed) AI calls. Add real rate limiting before that becomes a real risk, or swap in a separate, spend-capped API key instead of the shared one.

Until the function is deployed and the secret is set, both AI features fall back to the copy/paste-into-Claude flow — nothing breaks, it's just not one-tap.

## Publishing

Two separate deploys, both from this folder:

**The public link (GitHub Pages, no login)** — run `node tools/stamp-version.js` first (so a home-screen copy notices the update and reloads itself — see "Staying up to date" below), then push `index.html`, `recipes.js`, and `img/` as-is to the `frpike/chosemymeal` repo (no bundling needed, GitHub Pages serves multiple files directly) and it redeploys automatically.

**The claude.ai page** — Claude's published pages are one self-contained file, so `index.html`'s `<script src="recipes.js">` needs inlining first:

```
node tools/build-publish.js > /tmp/chosemymeal-publish.html
```

then publish `/tmp/chosemymeal-publish.html` (with the `sample` capability declared — `db` isn't used any more, Supabase replaced it) — never `index.html` on its own, or the live page loads with no recipes.

## Staying up to date on a home screen

A page added to an iPhone's home screen has no reload button and iOS won't re-fetch it on its own — without something explicit, a stale copy could sit there indefinitely after a deploy. `index.html` checks for itself: every time it's opened or comes back to the foreground, it re-fetches itself (bypassing cache) and reloads if the `app-version` meta tag has moved on. That tag only changes when `tools/stamp-version.js` runs, so **always run it before pushing to `frpike/chosemymeal`** — skip it and existing home-screen copies won't notice the update (new installs would still get the latest code, since they load it fresh). Not needed for the claude.ai page; that's always fetched fresh by claude.ai itself.

## Recipe photos

New ideas show a preview photo from their recipe page. The published page can't load pictures from other websites, so photos are downloaded into `img/` and published with the page:

```
NODE_PATH=$(npm root -g) node tools/fetch-images.js
```

This needs internet access to the recipe sites. It only fetches photos that are missing, and adds the `img` field to each recipe in `recipes.js`.

## Running it locally

Open `index.html` in a browser. Everything works once the Supabase keys are set, including asking Claude (via the Edge Function) and saving recipes — nothing here actually requires the published claude.ai page any more.
