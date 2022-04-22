const Sequelize = require('sequelize')
const db = require('../db')

const Tool = db.define('tool', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Tool
