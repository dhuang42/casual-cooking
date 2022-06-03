const router = require('express').Router()
const {Ingredient} = require('../db/models')

// All ingredients
// GET /api/ingredients
router.get('/', async (req, res, next) => {
  try {
    const ingredients = await Ingredient.findAll()
    res.json(ingredients)
  } catch (err) {
    next(err)
  }
})

// Single ingredient
// GET /api/ingredients/:ingredientId
router.get('/:ingredientId', async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findByPk(req.params.ingredientId)
    res.json(ingredient)
  } catch (err) {
    next(err)
  }
})

// All ingredients for specific recipe
// GET /api/ingredients/recipe/:recipeId
router.get('/recipe/:recipeId', async (req, res, next) => {
  try {
    const ingredients = await Ingredient.findAll({
      where: {
        recipeId: req.params.recipeId
      }
    })
    res.json(ingredients)
  } catch (err) {
    next(err)
  }
})

module.exports = router
