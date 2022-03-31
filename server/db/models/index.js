const User = require('./user')
const Recipe = require('./recipe')
const Step = require('./step')
const Ingredient = require('./ingredient')
const RecipeIngredient = require('./recipeIngredient')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

// one-to-many btwn User and Recipe
User.hasMany(Recipe)
Recipe.belongsTo(User)

// one-to-many btwn Recipe and Step
Recipe.hasMany(Step)
Step.belongsTo(Recipe)

// many-to-many btwn Recipe and Ingredient, using RecipeIngredient association table
Recipe.belongsToMany(Ingredient, {through: RecipeIngredient})
Ingredient.belongsToMany(Recipe, {through: RecipeIngredient})

module.exports = {
  User,
  Recipe,
  Step,
  Ingredient,
  RecipeIngredient
}
