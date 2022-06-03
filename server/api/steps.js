const router = require('express').Router()
const {Step} = require('../db/models')

// All steps
// GET /api/steps
router.get('/', async (req, res, next) => {
  try {
    const steps = await Step.findAll()
    res.json(steps)
  } catch (err) {
    next(err)
  }
})

// Single step
// GET /api/steps/:stepId
router.get('/:stepId', async (req, res, next) => {
  try {
    const step = await Step.findByPk(req.params.stepId)
    res.json(step)
  } catch (err) {
    next(err)
  }
})

// All steps for specific recipe
// GET /api/steps/recipe/recipeId
router.get('/recipe/:recipeId', async (req, res, next) => {
  try {
    const steps = await Step.findAll({
      where: {
        recipeId: req.params.recipeId
      }
    })
    res.json(steps)
  } catch (err) {
    next(err)
  }
})

module.exports = router
