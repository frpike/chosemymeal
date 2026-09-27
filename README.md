# Choose My Meal

Chessy & Duffy's dinner decider. Answer four quick questions and get two dinner ideas. If you don't fancy either, tell Claude what you're after.

## How it works

1. **When?** Day and current time are filled in for you. Pick how long you've got.
2. **Vibe?** *Weekend night* (new & exciting), *Chill* (one of our favourites) or *New but easy*.
3. **Whose kitchen?** At Duffy's (stock cubes, spices, oven and hob only), shorter shopping lists win and recipes needing a blender or sushi mat drop down. Each card shows what to buy.
4. **Protein?** Chicken, lamb, pork, chorizo, fish, prawns/seafood, or surprise us. Chorizo also picks up dishes like chicken & chorizo orzo. Beef is never suggested.

You get two suggestions, picked to be different from each other. **Shuffle** re-rolls them, and **🎲 Just pick for us** skips the questions. **We'll cook this!** keeps that dish out of the next few suggestions (remembered on that phone).

**Neither of those?** Type what you want (e.g. "something spicy with leeks, no oven") and Claude suggests another recipe with a source link. Claude can't browse the web, so it prefers the recipes in our list, which have checked links. Every idea also has a *Search for this recipe* link in case a link is wrong. This needs the published claude.ai page. Anywhere else, use *Copy request for Claude* and paste it into Claude.

**➕ Add a recipe** saves a reel or recipe to the shared list on the published page, and it goes into the suggestions straight away. To add recipes, you need the page shared with you as a Contributor or above.

⚠️ tags mean the recipe *as written* has dairy or sesame, so swap before cooking.

## Files

- `index.html` is the app.
- `recipes.js` has all the recipes: `favourites` (our usual mains) and `newIdeas` (new recipes, each with a source link). To add one permanently, copy an existing entry and edit it. The fields are explained at the top of the file.

## Recipe photos

New ideas show a preview photo from their recipe page. The published page can't load pictures from other websites, so photos are downloaded into `img/` and published with the page:

```
NODE_PATH=$(npm root -g) node tools/fetch-images.js
```

This needs internet access to the recipe sites. It only fetches photos that are missing, and adds the `img` field to each recipe in `recipes.js`.

## Running it locally

Open `index.html` in a browser. Everything works except asking Claude and saving recipes, which need the published page.
