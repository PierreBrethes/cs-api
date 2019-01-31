const Spyinglist = require('../models/Spyinglist')
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function index(req, res) {
  const result = (await Spyinglist.findAll());
  res.json(result);
}

async function create(data, req, res) {
  const result = (await Spyinglist
    .findOrCreate({where: {idOwner: data.idOwner, name: data.name}})
    .spread((item, created) => {
      if (created === true) {
        console.log("Ce compte instagram a bien été ajouté dans votre liste");
        res.json(item.get({plain: true}));
        res.end();
      } else {
        console.log("Ce compte instagram existe déjà dans votre liste.");
        res.json(item.get({plain: true}));
        res.end();
      }
    })
  )
}

async function deleteItem(data, req, res) {
  const result = (await Spyinglist
    .destroy({where: {idOwner: data.idOwner, name: data.name}})
    .then(() => {
      console.log('item '+data.name+' deleted');
      res.json({status: 'deleted', data: data});
      res.end();
    })
  )
}

module.exports = {index, create, deleteItem};
