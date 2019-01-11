var express = require('express');
var router = express.Router();
const testController = require('../controllers/testController.js')

router.get('/test', function(req, res, next) {
  return testController.getJson(req, res)
  res.end()
})

module.exports = router;
