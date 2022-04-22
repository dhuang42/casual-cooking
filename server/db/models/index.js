const User = require('./user')
const Recipe = require('./recipe')
const Step = require('./step')
const Ingredient = require('./ingredient')
const Tool = require('./tool')

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

// one-to-many btwn Recipe and Ingredient
Recipe.hasMany(Ingredient)
Ingredient.belongsTo(Recipe)

// one-to-many btwn Recipe and Tool
Recipe.hasMany(Tool)
Tool.belongsTo(Recipe)

module.exports = {
  User,
  Recipe,
  Step,
  Ingredient,
  Tool
}
