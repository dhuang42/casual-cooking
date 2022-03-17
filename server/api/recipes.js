const router = require('express').Router()
const {Recipe} = require('../db/models')

// All recipes
// GET /api/recipes
router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll()
    res.json(recipes)
  } catch (err) {
    next(err)
  }
})

module.exports = router
