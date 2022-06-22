const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipe', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true // must have name
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: '/no-image-icon.jpg'
  },
  time: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  serves: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  yieldQty: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  yieldUnit: {
    type: Sequelize.STRING
  }
})

module.exports = Recipe
