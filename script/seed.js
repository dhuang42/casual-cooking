'use strict'

const db = require('../server/db')
const {
  User,
  Recipe,
  Step,
  Ingredient,
  RecipeIngredient
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const recipes = await Promise.all([
    Recipe.create({
      name: 'Peanut Butter & Jelly Sandwich',
      description: 'A sandwich with peanut butter and jelly'
    }),
    Recipe.create({
      name: 'Hot Dog',
      description: 'A hot dog'
    }),
    Recipe.create({
      name: 'Salad',
      description: 'A salad'
    }),
    Recipe.create({
      name: 'Lime in the coconut',
      description: 'You put the lime in the coconut you mix em both up'
    })
  ])

  const steps = await Promise.all([
    // steps for pb&j
    Step.create({
      place: 1,
      instructions: 'spread peanut butter on bread'
    }),
    Step.create({
      place: 2,
      instructions: 'spread jelly on bread'
    }),
    Step.create({
      place: 3,
      instructions: 'put the bread together idk'
    }),
    // steps for hot dog
    Step.create({
      place: 1,
      instructions: 'grill the sausage'
    }),
    Step.create({
      place: 2,
      instructions: 'put the sausage in the bun'
    }),
    // steps for salad
    Step.create({
      place: 1,
      instructions: 'put the salad things in the bowl'
    }),
    Step.create({
      place: 2,
      instructions: 'toss the salad'
    }),
    // steps for lime in the coconut
    Step.create({
      place: 1,
      instructions: 'put the lime in the coconut'
    }),
    Step.create({
      place: 2,
      instructions: 'mix em both up'
    })
  ])

  const ingredients = await Promise.all([
    Ingredient.create({
      name: 'Peanut Butter'
    }),
    Ingredient.create({
      name: 'Jelly'
    }),
    Ingredient.create({
      name: 'Bread'
    }),
    Ingredient.create({
      name: 'Hot Dog Bun'
    }),
    Ingredient.create({
      name: 'Sausage'
    }),
    Ingredient.create({
      name: 'Salad things'
    }),
    Ingredient.create({
      name: 'Coconut'
    }),
    Ingredient.create({
      name: 'Lime'
    })
  ])

  // remember, for slice start idx (first arg) is inclusive
  // end idx (second arg) is exclusive (extraction ends BEFORE specified end index)
  // if end idx greater than sequence length, slicing will extract through to the end of sequence
  // tldr start idx included in the slice, end idx is not
  const associationUsersRecipes = await Promise.all([
    users[0].setRecipes(recipes.slice(0, 2)),
    users[1].setRecipes(recipes.slice(2, 4))
  ])

  const associationRecipesSteps = await Promise.all([
    recipes[0].setSteps(steps.slice(0, 3)),
    recipes[1].setSteps(steps.slice(3, 5)),
    recipes[2].setSteps(steps.slice(5, 7)),
    recipes[3].setSteps(steps.slice(7, 9))
  ])

  //! must finish creating these many-to-many associations
  const associationRecipesIngredients = await Promise.all([
    recipes[0].setIngredients([ingredients[0], ingredients[1], ingredients[2]])
  ])

  const associationIngredientsRecipes = await Promise.all([
    ingredients[0].setRecipes([recipes[0]]),
    ingredients[1].setRecipes([recipes[0]]),
    ingredients[2].setRecipes([recipes[0]])
  ])

  const recipeIngredients = await RecipeIngredient.findAll()
  //! must finish seed file by assinging quantity and unit to each recipeIngredient
  // figure out a way to pinpoint specific recipeIngredients

  console.log('recipeIngredients array', recipeIngredients)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${recipes.length} recipes`)
  console.log(`seeded ${steps.length} steps`)
  console.log(`seeded ${ingredients.length} ingredients`)
  console.log(`seeded ${recipeIngredients.length} recipeIngredients`)
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
