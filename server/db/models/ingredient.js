const Sequelize = require('sequelize')
const db = require('../db')

const Ingredient = db.define('ingredient', {
  quantity: {
    type: Sequelize.STRING
  },
  unit: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Ingredient
