// Downloads a preview photo for every new idea in recipes.js that has a
// source link but no photo yet, shrinks it, saves it to img/<slug>.jpg and
// adds `img: "img/<slug>.jpg"` to that recipe.
//
// The photo is the page's own share image (og:image), the same picture you
// see when the link is shared in a chat.
//
// Usage (needs internet access and Playwright):
//   NODE_PATH=$(npm root -g) node tools/fetch-images.js
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { chromium } = require("playwright");

const ROOT = path.join(__dirname, "..");
const RECIPES = path.join(ROOT, "recipes.js");
const IMG_DIR = path.join(ROOT, "img");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

function curl(url, binary) {
  return execFileSync("curl", ["-sSL", "-m", "25", "-A", UA, url], { encoding: binary ? "buffer" : "utf8", maxBuffer: 50 * 1024 * 1024 });
}
function ogImage(html, base) {
  const m = html.match(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)(?::src)?["'][^>]*>/i);
  const c = m && m[0].match(/content=["']([^"']+)["']/i);
  return c ? new URL(c[1].replace(/&amp;/g, "&"), base).href : null;
}
function slug(s) {
  return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}

(async () => {
  global.window = {};
  require(RECIPES);
  const ideas = window.RECIPES.newIdeas.filter((r) => r.url && !r.img);
  if (!ideas.length) return console.log("Every new idea already has a photo.");
  fs.mkdirSync(IMG_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  let src = fs.readFileSync(RECIPES, "utf8");
  let done = 0;

  for (const r of ideas) {
    const file = "img/" + slug(r.name) + ".jpg";
    try {
      const imgUrl = ogImage(curl(r.url), r.url);
      if (!imgUrl) throw new Error("no share image on the page");
      const raw = curl(imgUrl, true);
      const type = /\.png(\?|$)/i.test(imgUrl) ? "image/png" : /\.webp(\?|$)/i.test(imgUrl) ? "image/webp" : "image/jpeg";
      // Shrink to 640px wide in the browser and re-encode as JPEG.
      const b64 = await page.evaluate(async ({ data, type }) => {
        const img = new Image();
        img.src = "data:" + type + ";base64," + data;
        await img.decode();
        const w = Math.min(640, img.naturalWidth), h = Math.round(img.naturalHeight * (w / img.naturalWidth));
        const c = document.createElement("canvas"); c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        return c.toDataURL("image/jpeg", 0.74).split(",")[1];
      }, { data: raw.toString("base64"), type });
      fs.writeFileSync(path.join(ROOT, file), Buffer.from(b64, "base64"));

      // Add img: "..." straight after this recipe's url.
      const needle = 'url: "' + r.url + '",';
      if (!src.includes(needle)) throw new Error("couldn't find its url line in recipes.js");
      src = src.replace(needle, needle + ' img: "' + file + '",');
      done++;
      console.log("✓ " + r.name);
    } catch (e) {
      console.log("✗ " + r.name + " (" + String(e.message || e).split("\n")[0] + ")");
    }
  }
  fs.writeFileSync(RECIPES, src);
  await browser.close();
  console.log(done + " of " + ideas.length + " photos saved.");
})();
