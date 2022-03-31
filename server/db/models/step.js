const Sequelize = require('sequelize')
const db = require('../db')

const Step = db.define('step', {
  place: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  instructions: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Step
