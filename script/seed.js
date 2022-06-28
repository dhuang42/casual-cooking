'use strict'

const db = require('../server/db')
const {User, Recipe, Step, Ingredient, Tool} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  //! need to find and add more recipes to seed
  const recipes = await Promise.all([
    Recipe.create({
      name: 'Peanut Butter & Jelly Sandwich',
      description: 'A simple, traditional PB&J Sandwich.',
      imageUrl:
        'https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_73,ar_16:9,w_598/v1/img/recipes/24/39/65/picIDMFir.jpg',
      time: 2,
      serves: 1,
      yieldQty: 1,
      yieldUnit: 'sandwich'
    }),
    Recipe.create({
      name: 'Beef and Broccoli Stir-Fry',
      description:
        'A great tasting, easy to make beef and broccoli stir-fry. Made to serve over rice.',
      imageUrl:
        'https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_73,ar_16:9,w_560/v1/img/recipes/99/47/6/j7L11nRQNeKACth1WJkg_easy-beef-broccoli-stir-fry-6106.jpg',
      time: 25,
      serves: 4
    }),
    Recipe.create({
      name: 'Tuna Mayo Rice Bowl',
      description:
        'This homey dish takes comforting canned tuna to richer, silkier heights. Mayonnaise helps to hold the tuna together and toasted sesame oil lends incomparable nuttiness. You can adjust the seasonings to your taste: Use as much or as little soy sauce as you’d like for a savory accent. You can lean into the nuttiness of this rice bowl by sowing the top with toasted sesame seeds, or amp up the savoriness with furikake or scallions. A staple of home cooking in Hawaii and South Korea (where it is sometimes called deopbap), this simple meal is a workday workhorse.',
      imageUrl:
        'https://static01.nyt.com/images/2022/06/22/dining/21beginner-rex2/merlin_208168452_ef0bfb9e-7026-4e48-ad70-b64d84205197-articleLarge.jpg',
      time: 5,
      serves: 1
    }),
    Recipe.create({
      name: 'Guacamole',
      description:
        'Providing a framework to build on as you wish, this pared-down guacamole lets the avocado shine. If you want more lime, add more lime. Seed the jalapeño, if you prefer its fruity heat without the spice, or leave the seeds in, if you enjoy living life on the edge. Letting the diced onion sit in lime juice for a couple of minutes will help temper its pungent bite before imbuing the dish with its oniony savoriness. Chopped cilantro and diced tomatoes are welcome additions to this Mexican staple, if you’d like. It’s your guacamole. Serve with tortilla chips, or as a condiment alongside your meal, and double or triple this recipe for a party.',
      imageUrl:
        'https://static01.nyt.com/images/2022/06/22/dining/21beginner-rex1/merlin_208160622_52e89e7b-f828-452a-8da3-8edf706952ed-articleLarge.jpg',
      time: 10,
      yieldQty: 2,
      yieldUnit: 'cups'
    }),
    Recipe.create({
      name: 'Crispy-Edged Quesadilla',
      description:
        'This straightforward quesadilla has an unexpected twist: a border of salty, crispy cheese surrounding the tortilla. Achieving it couldn’t be easier; just press down on the folded tortilla as it heats up in the pan so the cheese spills out and turns golden. A nonstick pan is key here, otherwise the melted cheese will glue itself onto the cooking surface. Medium heat is just the right temperature for a quesadilla: It’s hot enough to crisp up the cheese but low enough to prevent the cheese from burning.',
      imageUrl:
        'https://static01.nyt.com/images/2022/06/22/dining/21beginner-rex5/merlin_208160703_2c8999fd-ad2e-4460-9321-d2a0c9b1a2da-articleLarge.jpg',
      time: 10,
      yieldQty: 1,
      yieldUnit: 'quesadilla'
    }),
    Recipe.create({
      name: 'French Toast',
      description:
        'Crackling around the edges and crisp on the outsides with pudding-soft centers, these thin slices of French toast taste like bread pudding, and feel especially like dessert if you smother them with maple syrup, jam or other sweet toppings. The key is to fully soak the bread, then cook the slices gently, so the insides cook through without the outsides burning. If the bread starts to brown too quickly, turn down the heat. You can double, triple or quadruple the amounts below to make enough for friends. Serve them in batches straight from the pan, or keep warm in a 200-degree oven on a plate or baking sheet.',
      imageUrl:
        'https://static01.nyt.com/images/2022/06/22/dining/21beginner-rex9/merlin_208168380_44ea7383-7d04-4d84-851b-575925088698-articleLarge.jpg',
      time: 10,
      serves: 1
    }),
    Recipe.create({
      name: 'Cheesy Eggs on Toast',
      description:
        'You don’t even need a toaster to make perfect toast. Crisping bread in a skillet — in melted butter, of course — gives it a tasty brown crunch and leaves you with a hot pan ready to scramble eggs. Be sure to swipe up all the butter and crumbs with the toasted bread when you take it out to keep the eggs nice and golden. Because more butter is added to the pan at the same time as the eggs, it melts slowly into the eggs while you stir them, leaving you with a creamy mix that ends up even creamier when cheese is melted in at the very end.',
      imageUrl:
        'https://static01.nyt.com/images/2022/06/22/dining/21beginnerrex8/merlin_208160643_302a75cd-0de6-467a-adeb-b4f209561919-articleLarge.jpg',
      time: 10,
      serves: 1
    }),
    Recipe.create({
      name: 'Star Wars Blue Milk',
      description:
        'May the 4th Be With You! I thought it would be fun to make Blue Milk (aka bantha milk) from Star Wars today. You can get this at the “Milk Stand” at Galaxy’s Edge in Disneyland. They describe it as a Plant-based blend of Coconut and Rice Milk with alluring fruity characteristics – it’s like a tropical slushie. My version is a more delicious upgrade to Disneyland’s version – I use real fruit and juices  instead of a long list of “flavorings”',
      imageUrl:
        'https://foodisafourletterword.com/wp-content/uploads/2022/05/Star_Wars_Blue_Milk_Recipe_03.jpg',
      time: 5,
      serves: 1
    })
  ])

  const ingredients = await Promise.all([
    // ingredients for pb&j, idx 0 - 2
    Ingredient.create({
      quantity: '2',
      unit: 'slices',
      name: 'sandwich bread'
    }),
    Ingredient.create({
      quantity: '2',
      unit: 'tablespoons',
      name: 'peanut butter'
    }),
    Ingredient.create({
      quantity: '2',
      unit: 'teaspoons',
      name: 'grape jelly or strawberry jam'
    }),

    // ingredients for beef broccoli stir fry, idx 3 - 14
    Ingredient.create({
      quantity: '3',
      unit: 'tablespoons',
      name: 'cornstarch, divided'
    }),
    Ingredient.create({
      quantity: '1/2',
      unit: 'cup',
      name: 'water, plus'
    }),
    Ingredient.create({
      quantity: '2',
      unit: 'tablespoons',
      name: 'water, divided'
    }),
    Ingredient.create({
      quantity: '1/2',
      unit: 'teaspoon',
      name: 'garlic powder'
    }),
    Ingredient.create({
      quantity: '1',
      unit: 'lb',
      name:
        'boneless round steak or 1 lb charcoal chuck steak, cut into thin 3-inch stips'
    }),
    Ingredient.create({
      quantity: '2',
      unit: 'tablespoons',
      name: 'vegetable oil, divided'
    }),
    Ingredient.create({
      quantity: '4',
      unit: 'cups',
      name: 'broccoli florets'
    }),
    Ingredient.create({
      quantity: '1',
      name: 'small onion, cut into wedges'
    }),
    Ingredient.create({
      quantity: '1',
      unit: 'cup',
      name: 'reduced sodium soy sauce'
    }),
    Ingredient.create({
      quantity: '2',
      unit: 'tablespoons',
      name: 'brown sugar'
    }),
    Ingredient.create({
      name: 'hot cooked rice, for serving'
    }),
    Ingredient.create({
      name: 'toasted sesame seeds, for serving, optional'
    }),

    // ingredients for tuna mayo rice bowl idx 15 - 20
    Ingredient.create({
      quantity: '1',
      unit: '(5 ounce) can',
      name: 'tuna (preferably any variety stored in oil), well drained'
    }),
    Ingredient.create({
      quantity: '2',
      unit: 'tablespoons',
      name: 'mayonaise'
    }),
    Ingredient.create({
      quantity: '1',
      unit: 'teaspoon',
      name: 'toasted sesame oil'
    }),
    Ingredient.create({
      quantity: '1/2',
      unit: 'teaspoon',
      name: 'soy sauce'
    }),
    Ingredient.create({
      quantity: '1',
      unit: 'cup',
      name: 'cooked white rice'
    }),
    Ingredient.create({
      name:
        'Toasted white or black sesame seeds, furikake or chopped scallions, for topping (optional)'
    }),

    // ingredients for guacamole idx 21 - 25
    Ingredient.create({
      quantity: '1/2',
      unit: 'cup',
      name: 'finely chopped white onion (from 1 small onion)'
    }),
    Ingredient.create({
      quantity: '2',
      unit: 'tablespoons',
      name: 'fresh lime juice (from about 1 lime)'
    }),
    Ingredient.create({
      name: 'Salt and black pepper'
    }),
    Ingredient.create({
      quantity: '1',
      name: 'jalapeño'
    }),
    Ingredient.create({
      quantity: '2',
      name: 'ripe avocados'
    }),

    // ingredients for cripsy-edged quesadilla idx 26 - 28
    Ingredient.create({
      quantity: '2',
      unit: 'teaspoons',
      name: 'oil (such as olive, grapeseed, or sunflower oil)'
    }),
    Ingredient.create({
      quantity: '1',
      name: '(8-inch) flour tortilla'
    }),
    Ingredient.create({
      quantity: '1/2',
      unit: 'cup',
      name:
        'shredded cheese (such as Cheddar, Monterey Jack, or Mexican cheese blend)'
    }),

    // ingredients for french toast idx 29 - 34
    Ingredient.create({
      quantity: '1',
      name: 'large egg'
    }),
    Ingredient.create({
      quantity: '1/4',
      unit: 'cup',
      name: 'milk'
    }),
    Ingredient.create({
      name: 'Salt'
    }),
    Ingredient.create({
      quantity: '2',
      unit: 'slices',
      name: 'sandwich bread'
    }),
    Ingredient.create({
      quantity: '1/2',
      unit: 'tablespoon',
      name: 'unsalted butter, plus more for serving'
    }),
    Ingredient.create({
      name: 'Maple syrup, jam, or other toppings - for serving'
    }),

    // ingredients for cheesy eggs on toast idx 35 - 39
    Ingredient.create({
      quantity: '2',
      name: 'large eggs'
    }),
    Ingredient.create({
      name: 'Salt and pepper'
    }),
    Ingredient.create({
      quantity: '1 1/2',
      unit: 'tablespoons',
      name: 'unsalted butter'
    }),
    Ingredient.create({
      quantity: '1',
      unit: 'slice',
      name: 'bread'
    }),
    Ingredient.create({
      quantity: '1/4',
      unit: 'cup',
      name: 'shredded cheese (Cheddar, Monterey Jack, or a blend)'
    }),

    // ingredients for blue milk idx 40 - 47
    Ingredient.create({
      quantity: '1/2',
      unit: 'Cup',
      name: 'Rice Milk'
    }),
    Ingredient.create({
      quantity: '1/2',
      unit: 'Cup',
      name: 'Passion Fruit Juice'
    }),
    Ingredient.create({
      quantity: '1/4',
      unit: 'Cup',
      name: 'Coconut Milk Beverage (from a cartion)'
    }),
    Ingredient.create({
      quantity: '1',
      unit: 'Cup',
      name: 'Frozen Pineapple Chunks'
    }),
    Ingredient.create({
      quantity: '2',
      unit: 'Teaspoons',
      name: 'Lime Juice'
    }),
    Ingredient.create({
      quantity: '2 - 3',
      name: 'Watermelon Jolly Ranchers'
    }),
    Ingredient.create({
      quantity: '3/4',
      unit: 'Cup',
      name: 'Ice'
    }),
    Ingredient.create({
      quantity: '2 - 4',
      unit: 'Drops',
      name: 'Neon Blue Food Coloring'
    })
  ])

  const tools = await Promise.all([
    // tools for broccoli stir-fry, idx 0
    Tool.create({
      name: 'large skillet or wok'
    })
  ])

  const steps = await Promise.all([
    // steps for pb&j idx 0 - 2
    Step.create({
      place: 1,
      instructions: 'Spread the peanut butter on one piece of bread.'
    }),
    Step.create({
      place: 2,
      instructions: 'Spread the jelly on the other side.'
    }),
    Step.create({
      place: 3,
      instructions: 'Put the two pieces of bread together to form a sandwich.'
    }),

    // steps for beef broccoli stir-fry, idx 3 - 9
    Step.create({
      place: 1,
      instructions:
        'In a bowl, combine 2 tablespoons cornstarch, 2 tablespoons water and garlic powder until smooth.'
    }),
    Step.create({
      place: 2,
      instructions: 'Add beef and toss.'
    }),
    Step.create({
      place: 3,
      instructions:
        'In a large skillet or wok over medium-high heat, stir-fry beef in 1 tablespoon oil until beef reaches desired doneness; remove and keep warm.'
    }),
    Step.create({
      place: 4,
      instructions:
        'Stir-fry onion in remaining oil for 4-5 minutes until softened. Add the broccoli and cook for 3 minutes until the broccoli is tender but still crisp. Return beef to pan.'
    }),
    Step.create({
      place: 5,
      instructions:
        'Combine soy sauce, brown sugar, ginger and remaining 1 tablespoon cornstarch and 1/2 cup water until smooth; add to the pan.'
    }),
    Step.create({
      place: 6,
      instructions: 'Cook and stir for 2 minutes.'
    }),
    Step.create({
      place: 7,
      instructions:
        'Serve over rice and garnish with toasted sesame seeds (optional).'
    }),

    // steps for tuna mayo rice bowl idx 10 - 11
    Step.create({
      place: 1,
      instructions:
        'In a small bowl, stir the tuna, mayonnaise, sesame oil and soy sauce to combine.'
    }),
    Step.create({
      place: 2,
      instructions:
        'Add the white rice to a bowl and spoon the tuna mixture on top. Sprinkle with the sesame seeds, furikake or scallions, if using.'
    }),

    // steps for guacamole idx 12 - 16
    Step.create({
      place: 1,
      instructions:
        'In a medium bowl, combine the onion and lime juice, and season with salt and pepper. Let that sit as you chop the jalapeño.'
    }),
    Step.create({
      place: 2,
      instructions:
        'Cut the hard stem end off of the jalapeño and discard, then slice the chile in half lengthwise. If you don’t want the spice, use your knife or a spoon to remove the inner seeds and white membrane (this is where most of the chile’s heat resides). If you enjoy the heat, then leave all of that in. Chop the jalapeño as finely as you can and add to the bowl with the onion and lime juice. Be sure to wash your hands very well with soap after handling spicy chiles like jalapeños, and whatever you do, do not touch your eyes after handling them.'
    }),
    Step.create({
      place: 3,
      instructions:
        'Cut the avocados in half lengthwise and pull the halves apart. You can use your knife to pit the avocados, but a safer way is to hold the avocado half in one hand so that your thumb is touching the skin side where the pit is and your index and middle fingers are touching the flesh side around the pit. Gently press your fingers into each other to pop the pit out; with a ripe avocado, it should come out very easily. Use your hands to squeeze the avocado flesh out into the bowl with the other ingredients, or scoop it out with a spoon.'
    }),
    Step.create({
      place: 4,
      instructions:
        'Using a fork, gently mash the avocados against the side of the bowl until they are mashed to your desired consistency, then stir them into the other ingredients until well combined. Taste and add more salt if desired.'
    }),
    Step.create({
      place: 5,
      instructions:
        'Contrary to popular belief, adding avocado pits to guacamole does nothing to prevent oxidation, but if you press a good layer of plastic wrap or parchment paper directly over the guacamole and store it in the refrigerator, it will keep well for up to 2 days.'
    }),

    // steps for crispy-edged quesadilla idx 17 - 19
    Step.create({
      place: 1,
      instructions:
        'Place a medium nonstick skillet over medium heat, then add the oil. Let oil heat up for 20 seconds, swirling the pan around so the oil coats the bottom.'
    }),
    Step.create({
      place: 2,
      instructions:
        'Place the tortilla in the skillet and sprinkle the cheese evenly over the top. Once the cheese begins to melt, 30 seconds to 1 minute, use a spatula to fold the tortilla in half. Using the spatula, press down firmly on the top of the tortilla until some of the cheese runs out into the pan. Let the quesadilla cook until the cheese that’s leaked out solidifies and turns brown, 2 to 3 minutes.'
    }),
    Step.create({
      place: 3,
      instructions:
        'Flip the quesadilla over and let cook on the other side for another 1 to 2 minutes, until the cheese is crisp and golden. Slide quesadilla onto a plate and serve immediately.'
    }),

    // steps for french toast idx 20 - 23
    Step.create({
      place: 1,
      instructions:
        'In a bowl or shallow dish that will fit the bread, beat the egg, milk and a pinch of salt with a fork until very smooth and bubbly on top.'
    }),
    Step.create({
      place: 2,
      instructions:
        'Add both bread slices (it’s OK to stack them if they don’t quite fit) and soak them, turning a few times, until the mixture is fully absorbed.'
    }),
    Step.create({
      place: 3,
      instructions:
        'Set a large nonstick skillet over medium heat. Add the butter and swirl it around the pan until it melts. The soaked bread will be really soft, so carefully pick up each slice by sliding your whole hand under it, then setting it in the pan. Cook until the bottoms are golden brown, about 3 minutes. Flip the slices, reduce the heat to medium-low and cook until the other sides are brown, 2 to 3 minutes.'
    }),
    Step.create({
      place: 4,
      instructions:
        'Enjoy hot, with more butter spread over the slices and with your favorite toppings.'
    }),

    // steps for cheesy eggs and toast 24 - 26
    Step.create({
      place: 1,
      instructions:
        'Crack the eggs into a bowl and sprinkle generously with salt and pepper. Beat with a fork until evenly yellow. Leave the bowl next to the stove while you make the toast.'
    }),
    Step.create({
      place: 2,
      instructions:
        'In a small nonstick skillet, melt a thin slice of the butter over medium-low heat. Swipe the bread in the melted butter to soak it all up. Let sit until golden brown, 2 to 3 minutes. Add another thin slice of butter to the pan then flip the bread, swiping it in the newly melted butter until it’s all soaked up. Turn the heat to the lowest setting and let the bread sit until lightly browned, 1 to 2 minutes. Transfer to a plate.'
    }),
    Step.create({
      place: 3,
      instructions:
        'Add the remaining butter and the eggs and cook, stirring gently and constantly with a wooden spoon, until the butter melts and the eggs are half wet and half solid, 15 to 45 seconds. Turn off the heat, add the cheese and continue stirring until the mixture is creamy but no longer wet, about 30 to 45 seconds. Scrape onto the toast right away and enjoy.'
    }),

    // step for blue milk idx 27
    Step.create({
      place: 1,
      instructions:
        'Add all ingredients to a blender and blend on high speed until smooth. Start with 2 drops of Neon Blue Food Coloring, then you can add more until you’re happy with the color. Taste and add sugar if you prefer it sweeter. Serve immediately & Enjoy!'
    })
  ])

  // remember, for slice start idx (first arg) is inclusive
  // end idx (second arg) is exclusive (extraction ends BEFORE specified end index)
  // if end idx greater than sequence length, slicing will extract through to the end of sequence
  // tldr start idx included in the slice, end idx is not
  const associationUsersRecipes = await Promise.all([
    users[0].setRecipes(recipes.slice(0, 2)),
    users[1].setRecipes(recipes.slice(2, 10))
  ])

  const associationRecipesIngredients = await Promise.all([
    recipes[0].setIngredients(ingredients.slice(0, 3)),
    recipes[1].setIngredients(ingredients.slice(3, 15)),
    recipes[2].setIngredients(ingredients.slice(15, 21)),
    recipes[3].setIngredients(ingredients.slice(21, 26)),
    recipes[4].setIngredients(ingredients.slice(26, 29)),
    recipes[5].setIngredients(ingredients.slice(29, 35)),
    recipes[6].setIngredients(ingredients.slice(35, 40)),
    recipes[7].setIngredients(ingredients.slice(40, 48))
  ])

  const associationRecipesTools = await Promise.all([
    recipes[1].setTools(tools.slice(0, 1))
  ])

  const associationRecipesSteps = await Promise.all([
    recipes[0].setSteps(steps.slice(0, 3)),
    recipes[1].setSteps(steps.slice(3, 10)),
    recipes[2].setSteps(steps.slice(10, 12)),
    recipes[3].setSteps(steps.slice(12, 17)),
    recipes[4].setSteps(steps.slice(17, 20)),
    recipes[5].setSteps(steps.slice(20, 24)),
    recipes[6].setSteps(steps.slice(24, 27)),
    recipes[7].setSteps(steps.slice(27, 28))
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${recipes.length} recipes`)
  console.log(`seeded ${ingredients.length} ingredients`)
  console.log(`seeded ${tools.length} tools`)
  console.log(`seeded ${steps.length} steps`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
