const router = require('express').Router()
const {Recipe} = require('../db/models')

//! needs PUT route, using same RecipeForm to edit the recipe

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

// Single recipe
// GET /api/recipes/:recipeId
router.get('/:recipeId', async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.recipeId)
    res.json(recipe)
  } catch (err) {
    next(err)
  }
})

// Add a new recipe
// POST /api/recipes
router.post('/', async (req, res, next) => {
  try {
    const [recipe, created] = await Recipe.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: req.body
    })

    if (!created) return res.sendStatus(409)
    return res.status(201).json(recipe)
  } catch (err) {
    next(err)
  }
})

// Delete recipe (irreversible)
// DELETE /api/recipes/:recipeId
router.delete('/:recipeId', async (req, res, next) => {
  try {
    await Recipe.destroy({
      where: {
        id: req.params.recipeId
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
