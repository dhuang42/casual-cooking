const router = require('express').Router()
module.exports = router

//! add routes for models ingredients, tools, and steps before they can show up on frontend

// all routes mounted on /api
router.use('/users', require('./users'))
router.use('/recipes', require('./recipes'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
