'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Recipe} = require('../server/db/models')

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
      description: 'A sandwich with peanut butter and jelly',
      ingredients: 'Peanut Butter, Jelly, Bread',
      instructions: 'spread the peanut butter and jelly on the bread n stuff'
    }),
    Recipe.create({
      name: 'Hot Dog',
      description: 'A hot dog',
      ingredients: 'Hot dog things',
      instructions: 'Grill the sausage, put it in the bun'
    }),
    Recipe.create({
      name: 'Salad',
      description: 'A salad',
      ingredients: 'Salad things',
      instructions: 'Get the salad things and toss the salad idk'
    }),
    Recipe.create({
      name: 'Lime in the coconut',
      description: 'You put the lime in the coconut you mix em both up',
      ingredients: 'You put the lime in the coconut you mix em both up',
      instructions: 'You put the lime in the coconut you mix em both up'
    })
  ])

  const associationUsersRecipes = await Promise.all([
    users[0].setRecipes(recipes.slice(0, 2)),
    users[1].setRecipes(recipes.slice(2, 4))
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${recipes.length} recipes`)
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
