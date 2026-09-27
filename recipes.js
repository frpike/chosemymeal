// Recipe data for Choose My Meal.
//
// Each recipe:
//   name     – what we call it
//   protein  – chicken | lamb | pork | chorizo | fish | seafood | veg
//              (the Chorizo button also matches anything with chorizo in it)
//   mins     – rough total time, start to plate
//   effort   – 1 (easy) to 3 (a project)
//   onePot   – true if it's a one-pot / one-tray
//   cuisine  – rough style, used to keep the two suggestions different
//   ing      – main things to buy (not oil, salt, spices or stock)
//   kit      – anything beyond an oven and hob (e.g. "blender", "sushi mat")
//   dairy / sesame – true if the recipe as written contains it (we adapt).
//                    Left off our favourites because we've already adapted them.
//   url      – source link (always set for new ideas)
//   img      – preview photo, e.g. "img/cod-chorizo-one-pot.jpg" (filled in by tools/fetch-images.py)
//   loves    – true if it uses leeks, butter beans or chorizo
//
// Beef is never allowed. Add new ones at the bottom of the right list.

window.RECIPES = {
  favourites: [
    { name: "Slow roast whole shoulder of lamb with sweet potato and thyme", protein: "lamb", mins: 270, effort: 3, cuisine: "british",
      ing: ["lamb shoulder", "sweet potatoes", "garlic", "thyme"], note: "Needs the whole afternoon." },
    { name: "A Great British fish and chips", protein: "fish", mins: 60, effort: 3, cuisine: "british",
      ing: ["white fish fillets", "potatoes", "flour", "beer or sparkling water", "peas"] },
    { name: "Homemade sushi night", protein: "fish", mins: 90, effort: 3, cuisine: "japanese",
      ing: ["sushi rice", "nori", "salmon or tuna", "cucumber", "avocado", "rice vinegar"], kit: "sushi mat" },
    { name: "Lamb burgers", protein: "lamb", mins: 30, effort: 1, cuisine: "british",
      ing: ["lamb mince", "burger buns", "red onion", "lettuce", "tomato"] },
    { name: "Monkfish baked in a parcel with leek and lemon", protein: "fish", mins: 35, effort: 1, cuisine: "british", loves: true,
      ing: ["monkfish", "leeks", "lemon", "new potatoes"] },
    { name: "Homemade pizza with artichoke and broccoli", protein: "veg", mins: 90, effort: 2, cuisine: "italian",
      ing: ["flour", "yeast", "passata", "artichoke hearts", "tenderstem broccoli", "dairy-free cheese"] },
    { name: "Baked chicken goujons for MY GOUJ!", protein: "chicken", mins: 35, effort: 1, cuisine: "british",
      ing: ["chicken breasts", "breadcrumbs", "egg", "flour", "potatoes or salad"] },
    { name: "Sicilian-style tuna with olives and capers", protein: "fish", mins: 25, effort: 1, cuisine: "italian",
      ing: ["tuna steaks", "olives", "capers", "cherry tomatoes", "pasta or potatoes"] },
    { name: "Savoury chickpea pancakes with chickpea, celery and onion filling", protein: "veg", mins: 40, effort: 2, cuisine: "indian",
      ing: ["gram flour", "chickpeas", "celery", "onion"] },
    { name: "Chicken pathia", protein: "chicken", mins: 45, effort: 2, cuisine: "indian",
      ing: ["chicken thighs", "onions", "tinned tomatoes", "lemon", "rice"] },
    { name: "Grilled lamb cutlets with crushed new potatoes and pea & mint purée", protein: "lamb", mins: 35, effort: 2, cuisine: "british",
      ing: ["lamb cutlets", "new potatoes", "frozen peas", "mint"], kit: "blender" },
    // One-pot wonders
    { name: "Coconut prawn curry", protein: "seafood", mins: 30, effort: 1, onePot: true, cuisine: "indian",
      ing: ["king prawns", "coconut milk", "onion", "tinned tomatoes", "spinach", "rice"] },
    { name: "Turkish spiced cabbage & minced lamb", protein: "lamb", mins: 35, effort: 1, onePot: true, cuisine: "turkish",
      ing: ["lamb mince", "cabbage", "onion", "tinned tomatoes"] },
    { name: "Potato, pepper and broccoli frittata", protein: "veg", mins: 30, effort: 1, onePot: true, cuisine: "spanish",
      ing: ["eggs", "potatoes", "peppers", "broccoli"] },
    { name: "Spelt with chorizo, sweet potato, red onion and spinach", protein: "chorizo", mins: 45, effort: 1, onePot: true, cuisine: "spanish", loves: true,
      ing: ["spelt", "chorizo", "sweet potato", "red onion", "spinach"] },
    { name: "Harissa chicken with leeks, potatoes and yogurt", protein: "chicken", mins: 50, effort: 1, onePot: true, cuisine: "north-african", loves: true,
      ing: ["chicken thighs", "leeks", "potatoes", "harissa", "dairy-free yogurt"] },
    { name: "The OG chestnut, borlotti and pancetta risotto", protein: "pork", mins: 45, effort: 2, onePot: true, cuisine: "italian",
      ing: ["risotto rice", "pancetta", "cooked chestnuts", "borlotti beans", "onion", "white wine"] },
    { name: "Chicken Pad Thai", protein: "chicken", mins: 30, effort: 2, onePot: true, cuisine: "thai",
      ing: ["rice noodles", "chicken breasts", "eggs", "beansprouts", "spring onions", "peanuts", "lime"] },
    { name: "Chicken, leek, bacon and bean traybake", protein: "chicken", mins: 55, effort: 1, onePot: true, cuisine: "british", loves: true,
      ing: ["chicken thighs", "bacon", "leeks", "cannellini beans", "white wine"],
      url: "https://annasfamilykitchen.com/recipes/chicken-leek-bacon-bean-traybake/" },
    { name: "Caldo verde", protein: "chorizo", mins: 40, effort: 1, onePot: true, cuisine: "portuguese", loves: true,
      ing: ["chorizo", "potatoes", "kale or cavolo nero", "onion"] },
    { name: "Seafood and chorizo paella", protein: "seafood", mins: 60, effort: 2, onePot: true, cuisine: "spanish", loves: true,
      ing: ["paella rice", "chorizo", "prawns", "mussels or squid", "peppers", "peas", "saffron"] },
    { name: "Cod, chorizo and chickpea bake", protein: "fish", mins: 35, effort: 1, onePot: true, cuisine: "spanish", loves: true,
      ing: ["cod fillets", "chorizo", "chickpeas", "cherry tomatoes"] },
    { name: "One-tray Thai roast chicken with coconut rice", protein: "chicken", mins: 60, effort: 1, onePot: true, cuisine: "thai",
      ing: ["chicken thighs", "rice", "coconut milk", "Thai curry paste", "lime", "green beans"] },
    { name: "Mediterranean fish with orzo and tomatoes", protein: "fish", mins: 30, effort: 1, onePot: true, cuisine: "greek",
      ing: ["white fish fillets", "orzo", "cherry tomatoes", "olives", "lemon"] }
  ],

  newIdeas: [
    // Anna's Family Kitchen
    { name: "Cod & chorizo one pot", source: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/recipes/cod-chorizo-one-pot/", img: "img/cod-and-chorizo-one-pot.jpg",
      protein: "fish", mins: 30, effort: 1, onePot: true, cuisine: "spanish", loves: true,
      ing: ["cod fillets", "chorizo", "potatoes", "mushrooms", "runner beans", "lemon"] },
    { name: "Chicken and chorizo orzo", source: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/recipes/chicken-chorizo-orzo/", img: "img/chicken-and-chorizo-orzo.jpg",
      protein: "chicken", mins: 20, effort: 1, onePot: true, cuisine: "spanish", loves: true,
      ing: ["chicken breasts", "chorizo", "orzo", "tinned tomatoes", "spinach"] },
    { name: "Spanish chicken, chorizo and bean one pot", source: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/recipes/spanish-chicken-chorizo-bean-stew-onepot/", img: "img/spanish-chicken-chorizo-and-bean-one-pot.jpg",
      protein: "chicken", mins: 40, effort: 1, onePot: true, cuisine: "spanish", loves: true,
      ing: ["chicken thighs", "chorizo", "beans", "sweet potato", "spinach", "tinned tomatoes"] },
    { name: "Cajun \"dirty rice\" with prawns", source: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/recipes/cajun-rice-prawns/", img: "img/cajun-dirty-rice-with-prawns.jpg",
      protein: "seafood", mins: 35, effort: 1, onePot: true, cuisine: "cajun",
      ing: ["king prawns", "rice", "peppers", "celery", "onion", "Cajun spice"] },
    { name: "Prawn and chorizo risotto", source: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/recipes/prawn-chorizo-risotto/", img: "img/prawn-and-chorizo-risotto.jpg",
      protein: "seafood", mins: 40, effort: 2, onePot: true, cuisine: "italian", dairy: true, loves: true,
      ing: ["risotto rice", "king prawns", "chorizo", "onion", "peas", "white wine"] },
    { name: "Chilli prawn pasta", source: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/recipes/chilli-prawn-pasta/", img: "img/chilli-prawn-pasta.jpg",
      protein: "seafood", mins: 15, effort: 1, cuisine: "italian",
      ing: ["king prawns", "spaghetti", "chilli", "garlic", "cherry tomatoes", "lemon"] },
    { name: "Chicken and chorizo pasta with peas", source: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/recipes/chicken-and-chorizo-pasta-with-peas/", img: "img/chicken-and-chorizo-pasta-with-peas.jpg",
      protein: "chicken", mins: 25, effort: 1, cuisine: "italian", loves: true,
      ing: ["chicken breasts", "chorizo", "pasta", "peas", "tinned tomatoes"] },
    { name: "Spring chicken one pot", source: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/recipes/spring-chicken-one-pot/", img: "img/spring-chicken-one-pot.jpg",
      protein: "chicken", mins: 45, effort: 1, onePot: true, cuisine: "british", dairy: true, loves: true,
      ing: ["chicken breasts (skin on)", "leeks", "new potatoes", "spring greens", "garlic"] },
    { name: "Summer sausage cassoulet", source: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/recipes/summer-sausage-cassoulet/", img: "img/summer-sausage-cassoulet.jpg",
      protein: "pork", mins: 45, effort: 1, onePot: true, cuisine: "french", dairy: true, loves: true,
      ing: ["sausages", "butter beans", "new potatoes", "leeks", "pesto", "green veg"] },
    { name: "Sausage and bean one pot", source: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/recipes/sausage-bean/", img: "img/sausage-and-bean-one-pot.jpg",
      protein: "pork", mins: 45, effort: 1, onePot: true, cuisine: "british",
      ing: ["sausages", "peppers", "red onions", "mixed beans", "cherry tomatoes", "chard or kale"] },
    { name: "Sunday roast chicken one pot", source: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/recipes/sunday-roast-chicken-one-pot/", img: "img/sunday-roast-chicken-one-pot.jpg",
      protein: "chicken", mins: 90, effort: 2, onePot: true, cuisine: "british",
      ing: ["whole chicken or thighs", "potatoes", "carrots", "leeks or onions", "greens"] },
    { name: "Lamb and roasted veg one pot", source: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/recipes/american-sliders-2/", img: "img/lamb-and-roasted-veg-one-pot.jpg",
      protein: "lamb", mins: 75, effort: 1, onePot: true, cuisine: "british",
      ing: ["lamb leg steaks or neck fillet", "potatoes", "peppers", "red onions", "courgette"] },
    { name: "Lamb hot pot", source: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/recipes/asian-pulled-pork-3/", img: "img/lamb-hot-pot.jpg",
      protein: "lamb", mins: 150, effort: 2, onePot: true, cuisine: "british",
      ing: ["diced lamb", "potatoes", "onions", "carrots", "Worcestershire sauce"] },
    { name: "Lamb rogan josh", source: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/recipes/lamb-rogan-josh-curry/", img: "img/lamb-rogan-josh.jpg",
      protein: "lamb", mins: 180, effort: 2, onePot: true, cuisine: "indian", dairy: true,
      ing: ["diced lamb", "onions", "tinned tomatoes", "yogurt", "ginger", "rice"] },
    { name: "Twice cooked pork", source: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/recipes/twice-cooked-pork/", img: "img/twice-cooked-pork.jpg",
      protein: "pork", mins: 200, effort: 3, cuisine: "chinese",
      ing: ["pork belly or shoulder", "soy sauce", "honey", "ginger", "rice", "pak choi"] },
    { name: "Clam, prawn and scallop one pot", source: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/recipes/asian-pulled-pork-6/", img: "img/clam-prawn-and-scallop-one-pot.jpg",
      protein: "seafood", mins: 40, effort: 2, onePot: true, cuisine: "spanish",
      ing: ["clams", "king prawns", "scallops", "tinned tomatoes", "white wine", "crusty bread"] },

    // RecipeTin Eats
    { name: "One pot Greek chicken and lemon rice", source: "RecipeTin Eats", url: "https://www.recipetineats.com/one-pot-greek-chicken-lemon-rice/", img: "img/one-pot-greek-chicken-and-lemon-rice.jpg",
      protein: "chicken", mins: 50, effort: 1, onePot: true, cuisine: "greek",
      ing: ["chicken thighs", "long grain rice", "lemon", "onion", "garlic", "oregano"] },
    { name: "One pot Mexican chicken and rice", source: "RecipeTin Eats", url: "https://www.recipetineats.com/one-pot-mexican-chicken-rice/", img: "img/one-pot-mexican-chicken-and-rice.jpg",
      protein: "chicken", mins: 40, effort: 1, onePot: true, cuisine: "mexican",
      ing: ["chicken breasts", "rice", "black beans", "sweetcorn", "tinned tomatoes", "peppers"] },
    { name: "Nando's-style Portuguese chicken and rice", source: "RecipeTin Eats", url: "https://www.recipetineats.com/portuguese-chicken-and-rice-one-pot-recipe/", img: "img/nando-s-style-portuguese-chicken-and-rice.jpg",
      protein: "chicken", mins: 50, effort: 1, onePot: true, cuisine: "portuguese",
      ing: ["chicken thighs", "rice", "peppers", "onion", "lemon", "peri-peri spice"] },
    { name: "Ginger chicken and rice", source: "RecipeTin Eats", url: "https://www.recipetineats.com/ginger-chicken-and-rice/", img: "img/ginger-chicken-and-rice.jpg",
      protein: "chicken", mins: 40, effort: 1, onePot: true, cuisine: "chinese", sesame: true,
      ing: ["chicken thighs", "rice", "ginger", "spring onions", "soy sauce", "oyster sauce"] },
    { name: "One pot Chinese chicken and rice", source: "RecipeTin Eats", url: "https://www.recipetineats.com/one-pot-chinese-chicken-and-rice/", img: "img/one-pot-chinese-chicken-and-rice.jpg",
      protein: "chicken", mins: 40, effort: 1, onePot: true, cuisine: "chinese", sesame: true,
      ing: ["chicken thighs", "rice", "soy sauce", "oyster sauce", "Chinese cooking wine", "spring onions"] },
    { name: "Lamb kofta meatball traybake", source: "RecipeTin Eats", url: "https://www.recipetineats.com/tray-bake-dinner-lamb-kofta-meatballs/", img: "img/lamb-kofta-meatball-traybake.jpg",
      protein: "lamb", mins: 40, effort: 1, onePot: true, cuisine: "middle-eastern", dairy: true,
      ing: ["lamb mince", "red onion", "peppers", "courgette", "flatbreads", "yogurt"] },
    { name: "Thai larb lettuce wraps (chicken or pork)", source: "RecipeTin Eats", url: "https://www.recipetineats.com/thai-chicken-lettuce-cups-larb-gai-laab-gai/", img: "img/thai-larb-lettuce-wraps-chicken-or-pork.jpg",
      protein: "pork", mins: 20, effort: 1, cuisine: "thai",
      ing: ["pork or chicken mince", "little gem lettuce", "lime", "mint", "coriander", "fish sauce", "rice"] },
    { name: "Malaysian chicken satay curry", source: "RecipeTin Eats", url: "https://www.recipetineats.com/chicken-satay-curry/", img: "img/malaysian-chicken-satay-curry.jpg",
      protein: "chicken", mins: 35, effort: 1, onePot: true, cuisine: "malaysian",
      ing: ["chicken thighs", "coconut milk", "peanut butter", "onion", "curry powder", "rice"] },
    { name: "Honey garlic salmon", source: "RecipeTin Eats", url: "https://www.recipetineats.com/honey-garlic-salmon-5-ingredients-15-minutes/", img: "img/honey-garlic-salmon.jpg",
      protein: "fish", mins: 15, effort: 1, cuisine: "asian", dairy: true,
      ing: ["salmon fillets", "honey", "garlic", "soy sauce", "rice", "greens"] },
    { name: "Lemon garlic salmon tray bake", source: "RecipeTin Eats", url: "https://www.recipetineats.com/lemon-garlic-salmon-tray-bake-easy-healthy/", img: "img/lemon-garlic-salmon-tray-bake.jpg",
      protein: "fish", mins: 25, effort: 1, onePot: true, cuisine: "greek", dairy: true,
      ing: ["salmon fillets", "asparagus", "cherry tomatoes", "lemon", "garlic"] },

    // Mob
    { name: "One pan chorizo gnocchi", source: "Mob", url: "https://www.mob.co.uk/recipes/one-pan-gnocchi", img: "img/one-pan-chorizo-gnocchi.jpg",
      protein: "chorizo", mins: 25, effort: 1, onePot: true, cuisine: "italian", loves: true,
      ing: ["gnocchi", "chorizo", "cherry tomatoes", "spinach", "garlic"] },
    { name: "Meatball gnocchi bake (use pork mince)", source: "Mob", url: "https://www.mob.co.uk/recipes/meatball-gnocchi-bake", img: "img/meatball-gnocchi-bake-use-pork-mince.jpg",
      protein: "pork", mins: 50, effort: 2, onePot: true, cuisine: "italian", dairy: true,
      ing: ["pork mince", "gnocchi", "passata", "onion", "garlic", "basil"], note: "Swap any beef mince for pork." },

    // Others
    { name: "Leek, butter bean and chorizo gratin", source: "Good Food", url: "https://www.bbcgoodfoodme.com/recipes/leek-butter-bean-and-chorizo-gratin/", img: "img/leek-butter-bean-and-chorizo-gratin.jpg",
      protein: "chorizo", mins: 45, effort: 1, onePot: true, cuisine: "spanish", dairy: true, loves: true,
      ing: ["leeks", "butter beans", "chorizo", "sherry", "breadcrumbs"] },
    { name: "Chorizo and butter bean stew", source: "Justine Pattison", url: "https://www.justinepattison.com/recipe/chorizo-and-butter-bean-stew/", img: "img/chorizo-and-butter-bean-stew.jpg",
      protein: "chorizo", mins: 30, effort: 1, onePot: true, cuisine: "spanish", loves: true,
      ing: ["chorizo", "butter beans", "onion", "peppers", "tinned tomatoes", "crusty bread"] },
    { name: "Crispy roasted gnocchi with chorizo and veg", source: "Beat The Budget", url: "https://beatthebudget.com/recipe/crispy-roasted-gnocchi-with-chorizo-and-vegetables/",
      protein: "chorizo", mins: 50, effort: 1, onePot: true, cuisine: "italian", loves: true,
      ing: ["gnocchi", "chorizo", "cherry tomatoes", "aubergine", "courgette", "basil"] },
    { name: "Harissa chicken traybake with chorizo and gnocchi", source: "Ocado", url: "https://www.ocado.com/recipes/harissa-chicken-traybake-with-chorizo-and-gnocchi/223479",
      protein: "chicken", mins: 45, effort: 1, onePot: true, cuisine: "north-african", loves: true,
      ing: ["chicken thighs", "chorizo", "gnocchi", "harissa", "tinned tomatoes", "red onion"] },
    { name: "Ottolenghi's orzo with prawns, tomato and marinated feta", source: "The Happy Foodie", url: "https://thehappyfoodie.co.uk/recipes/ottolenghis-orzo-with-prawns-tomato-and-marinated-feta/", img: "img/ottolenghi-s-orzo-with-prawns-tomato-and-marinated-feta.jpg",
      protein: "seafood", mins: 40, effort: 2, onePot: true, cuisine: "greek", dairy: true,
      ing: ["orzo", "king prawns", "tinned tomatoes", "feta", "fennel seeds", "lemon"] },
    { name: "Jamie's one-pan fabulous fish", source: "The Happy Foodie", url: "https://thehappyfoodie.co.uk/recipes/one-pan-fabulous-fish/", img: "img/jamie-s-one-pan-fabulous-fish.jpg",
      protein: "fish", mins: 30, effort: 1, onePot: true, cuisine: "italian",
      ing: ["white fish fillets", "rice", "black olive tapenade", "cherry tomatoes", "basil"] },
    { name: "Nigella's aromatic lamb meatballs", source: "Food Network", url: "https://www.foodnetwork.com/recipes/nigella-lawson/aromatic-lamb-meatballs-recipe-1946488",
      protein: "lamb", mins: 60, effort: 2, onePot: true, cuisine: "middle-eastern",
      ing: ["lamb mince", "onion", "tinned tomatoes", "cinnamon", "rice or couscous"] },
    { name: "Easy Thai prawn curry", source: "Good Food", url: "https://www.bbcgoodfoodme.com/recipes/easy-thai-prawn-curry/", img: "img/easy-thai-prawn-curry.jpg",
      protein: "seafood", mins: 25, effort: 1, onePot: true, cuisine: "thai",
      ing: ["king prawns", "Thai curry paste", "coconut cream", "tinned tomatoes", "ginger", "rice"] }
  ],

  // Inspiration accounts shown in the app footer
  inspiration: [
    { name: "Anna's Family Kitchen", url: "https://annasfamilykitchen.com/all-recipes/" },
    { name: "Flavour Fellas", url: "https://www.instagram.com/flavourfellas_/" },
    { name: "RecipeTin Eats", url: "https://www.recipetineats.com/category/one-pot-recipes/" },
    { name: "Mob one-pots", url: "https://www.mob.co.uk/recipes/collections/one-pot-recipes" }
  ]
};
