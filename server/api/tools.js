const router = require('express').Router()
const {Tool} = require('../db/models')

// All tools
// GET /api/tools
router.get('/', async (req, res, next) => {
  try {
    const tools = await Tool.findAll()
    res.json(tools)
  } catch (err) {
    next(err)
  }
})

// Single tool
// GET /api/tools/:toolId
router.get('/:toolId', async (req, res, next) => {
  try {
    const tool = await Tool.findByPk(req.params.toolId)
    res.json(tool)
  } catch (err) {
    next(err)
  }
})

module.exports = router
