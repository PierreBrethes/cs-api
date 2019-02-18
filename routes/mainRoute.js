var express = require('express');
var router = express.Router();
const testController = require('../controllers/testController.js')
const spyinglistController = require('../controllers/spyinglistController.js')
const Spyinglist = require('../controllers/SpyinglistController')
var bodyParser = require('body-parser')
var cors = require('cors');


// TEST ROUTES
router.get('/spyinglist/:id/:token', function(req, res, next) {
  return testController.getJson(req, res)
  res.end()
})

router.get('/feed/:id/:token', function(req, res, next) {
  return testController.getFeed(req, res)
  res.end()
})





// REAL ROUTES
router.get('/spyinglist',function(req,res,next){
  return spyinglistController.index(req, res)
 })

 router.get('/spyinglist/:id',function(req,res,next){
   return spyinglistController.indexById(req.params.id, req, res)
  })

router.post('/spyinglist/:id', function(req,res,next){
  const data = { idOwner: req.params.id, name: req.body.name}
  return spyinglistController.create(data, req, res)
})

router.options('/spyinglist/:id/:rss', cors()) 
router.delete('/spyinglist/:id/:rss', cors(), function(req,res,next){
  console.log(req.body.id_fetchrss);
  const data = { idOwner: req.params.id, id_fetchrss: req.params.rss}
  return spyinglistController.deleteItem(data, req, res)
})

module.exports = router;
