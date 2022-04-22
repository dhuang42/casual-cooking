const router = require('express').Router()
module.exports = router

//! add and test routes PUT, POST, and DELETE routes for all models

// all routes mounted on /api
router.use('/users', require('./users'))
router.use('/recipes', require('./recipes'))
router.use('/ingredients', require('./ingredients'))
router.use('/tools', require('./tools'))
router.use('/steps', require('./steps'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
