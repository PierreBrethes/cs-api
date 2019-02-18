const Spyinglist = require('../models/Spyinglist')
var Sequelize = require('sequelize');
const request = require('./request.js');
const Op = Sequelize.Op;

async function index(req, res) {
  const result = (await Spyinglist.findAll());
  res.json(result);
}

async function indexById(id, req, res) {
  const result = (await Spyinglist
    .findAll({where: {idOwner: id}})
  )
  res.json(result);
}

async function create(data, req, res) {
  const host = "http://fetchrss.com/api/v1/"
  const endpoint = () => {return "feed/create?auth=5c5d73498a93f8847e8b4567.enufbAIrdblkaG9zvd&url=https://instagram.com/"+data.name};
  try {
    const fetchrss = await request(host, endpoint(), null, null, "GET");
    if (fetchrss.feed !== undefined) {
      const result = (await Spyinglist
        .findOrCreate({where: {idOwner: data.idOwner, name: data.name, hashrss: fetchrss.feed.rss_url, id_fetchrss: fetchrss.feed.id}})
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
    } else {
      res.json('Error with Fetchrss, maybe wait few minutes.')
    }
  } catch (error) {
    console.log("fetchrss response : ",error);
  }
}

async function deleteItem(data, req, res) {
  const host = "http://fetchrss.com/api/v1/";
  const endpoint = () => {return "feed/delete?auth=5c5d73498a93f8847e8b4567.enufbAIrdblkaG9zvd&id="+data.id_fetchrss};
  const fetchrss = await request(host, endpoint(), null, null, "GET");
  

  const result = (await Spyinglist
    .destroy({where: {idOwner: data.idOwner, id_fetchrss: data.id_fetchrss}})
    .then(() => {
      console.log('item '+data.name+' deleted');
      res.json({status: 'deleted', data: data});
      res.end();
    })
  )
}

module.exports = {index, indexById, create, deleteItem};
