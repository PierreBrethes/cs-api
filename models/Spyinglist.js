var Sequelize = require('sequelize');
var sequelize = require('../db.js');

const Spyinglist = sequelize.define('spyinglist', {

  idOwner: { type: Sequelize.STRING},
  name: {type: Sequelize.STRING}

})

module.exports = Spyinglist;
