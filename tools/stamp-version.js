#!/usr/bin/env node
// Bumps the <meta name="app-version"> tag in index.html to the current
// timestamp. Run this right before every deploy of the public link
// (frpike/chosemymeal) -- it's what the self-update check in index.html
// compares against to notice a new deploy and reload a stale home-screen
// copy. Not needed for the claude.ai page (that's always freshly fetched).

const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "index.html");
const html = fs.readFileSync(file, "utf8");
const stamp = new Date().toISOString();
const next = html.replace(/name="app-version" content="[^"]*"/, `name="app-version" content="${stamp}"`);

if (next === html) {
  throw new Error('Could not find <meta name="app-version"> in index.html to stamp.');
}

fs.writeFileSync(file, next);
console.log(`  stamped app-version: ${stamp}`);
