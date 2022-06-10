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
      time: 2,
      serves: 1,
      yieldQty: 1,
      yieldUnit: 'sandwich'
    }),
    Recipe.create({
      name: 'Beef and Broccoli Stir-Fry',
      description:
        'A great tasting, easy to make beef and broccoli stir-fry. Made to serve over rice.',
      time: 25,
      serves: 4
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
    })
  ])

  // remember, for slice start idx (first arg) is inclusive
  // end idx (second arg) is exclusive (extraction ends BEFORE specified end index)
  // if end idx greater than sequence length, slicing will extract through to the end of sequence
  // tldr start idx included in the slice, end idx is not
  const associationUsersRecipes = await Promise.all([
    users[0].setRecipes(recipes.slice(0, 2))

    // users[1].setRecipes(recipes.slice(2, 4))
  ])

  const associationRecipesIngredients = await Promise.all([
    recipes[0].setIngredients(ingredients.slice(0, 3)),
    recipes[1].setIngredients(ingredients.slice(3, 15))
  ])

  const associationRecipesTools = await Promise.all([
    recipes[1].setTools(tools.slice(0, 1))
  ])

  const associationRecipesSteps = await Promise.all([
    recipes[0].setSteps(steps.slice(0, 3)),
    recipes[1].setSteps(steps.slice(3, 10))
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
