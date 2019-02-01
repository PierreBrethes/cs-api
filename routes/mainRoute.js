var express = require('express');
var router = express.Router();
const testController = require('../controllers/testController.js')
const spyinglistController = require('../controllers/spyinglistController.js')
const Spyinglist = require('../controllers/SpyinglistController')
var bodyParser = require('body-parser')

router.get('/spyinglist/:id/:token', function(req, res, next) {
  return testController.getJson(req, res)
  res.end()
})

router.get('/spyinglist',function(req,res,next){
  return spyinglistController.index(req, res)
 })

 router.get('/spyinglist/:id',function(req,res,next){
   return spyinglistController.indexById(req.params.id, req, res)
  })

router.post('/spyinglist/:id', function(req,res,next){
  const data = { idOwner: req.params.id, name: req.body.name}
  console.log('------', req.body)
  return spyinglistController.create(data, req, res)
})

router.delete('/spyinglist/:id', function(req,res,next){
  const data = { idOwner: req.params.id, name: req.body.name}
  return spyinglistController.deleteItem(data, req, res)
})

module.exports = router;
