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

    // ingredients for cripsy-edged quesadilla 26 - 28
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

    // steps for crispy-edged quesadilla 17 - 19
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
    recipes[4].setIngredients(ingredients.slice(26, 29))
  ])

  const associationRecipesTools = await Promise.all([
    recipes[1].setTools(tools.slice(0, 1))
  ])

  const associationRecipesSteps = await Promise.all([
    recipes[0].setSteps(steps.slice(0, 3)),
    recipes[1].setSteps(steps.slice(3, 10)),
    recipes[2].setSteps(steps.slice(10, 12)),
    recipes[3].setSteps(steps.slice(12, 17)),
    recipes[4].setSteps(steps.slice(17, 20))
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
