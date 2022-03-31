const Sequelize = require('sequelize')
const db = require('../db')

const RecipeIngredient = db.define('recipeIngredient', {
  quantity: {
    type: Sequelize.STRING
  },
  unit: {
    type: Sequelize.STRING
  }
})

module.exports = RecipeIngredient
