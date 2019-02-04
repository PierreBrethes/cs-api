const request = require('./request.js');
const spyinglistController = require('../controllers/spyinglistController.js');
const Spyinglist = require('../models/Spyinglist');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const host = "https://graph.facebook.com/v3.2/";
const access_token = "EAAIN3B5QQx4BAK3m19sQblC7OVz48ue3LdU6EtNbC8VHHoONHTu4KIXMXo1POQZCUpJTkf5fJaZAshkOj2WVGFYhLZAbT6vuS187gYJkAPZBmMsWOMZAVcwyTuTEUrwP3PLhfaZBgsavIeZC4sxn6gD6pbyuFtZBKxsyGvWrZBZAoSo9NcJR0hyAolaDDxfjDZCgwXuZA4vYJINRhAZDZD";
const user = "17841407080160735";

async function getJson(req, res) {
  const endpoint = () => {return req.params.id+"?fields=follows_count%2Cmedia_count%2Cfollowers_count%2Cbusiness_discovery.username(design__addict)%2Cmedia%7Bid%2Clike_count%2Ccomments_count%2Cmedia_url%2Cpermalink%7D&access_token="+req.params.token};
  console.log(endpoint);
  const data = await request(host, endpoint(), null, null, "GET");

  res.json(data)
}

async function getFeed(req, res) {
  try {
      // ARRAY for RESULT
      const names = []
      const json = []

      // SELECT NAMES by ID
      const response = await Spyinglist.findAll({where: {idOwner: req.params.id}})
      // SAVE in "names" array each item of last request (response)
      const extractNames = response.forEach( function (value) {
        const item = value.name;
        names.push(item);
      })

      // PREPARE ENDPOINT FOR REQUEST GRAPH.FACEBOOK
      const endpoint = (name) => {return req.params.id+"?fields=follows_count%2Cmedia_count%2Cfollowers_count%2Cbusiness_discovery.username("+name+")%2Cmedia%7Bid%2Clike_count%2Cmedia.limit(10)%2Ccomments_count%2Cmedia_url%2Cpermalink%7D&access_token="+req.params.token};

      // REQUEST GRAPH.FACEBOOK for each name in "names" array, and push it in
      names.map(async (index) => {
        const data = await request(host, endpoint(index), null, null, "GET");
        if (data.error === undefined) {
          data.media.data.map((item) => {
            console.log(item);
            json.push(item);
          })
          res.json(json)
        }
      })
  } catch (error) {
      res.write(error);
      console.error(error);
  }
}

// async function getFeed(id, token, req, res) {
//   const feed = [];
//   const endpoint = () => {return req.params.id+"?fields=follows_count%2Cmedia_count%2Cfollowers_count%2Cbusiness_discovery.username(design__addict)%2Cmedia%7Bid%2Clike_count%2Ccomments_count%2Cmedia_url%2Cpermalink%7D&access_token="+req.params.token};
//   console.log(endpoint);
//   const data = await request(host, endpoint(), null, null, "GET");
//
//   res.json(data)

  // GET LIST OF NAME SAVED
  // const result = (await Spyinglist
  //   .findAll({where: {idOwner: id}})
  // );
  // PREPARE ENDPOINT
  // const endpoint = (name) => {return req.params.id+"?fields=follows_count%2Cmedia_count%2Cfollowers_count%2Cbusiness_discovery.username("+name+")%2Cmedia%7Bid%2Clike_count%2Ccomments_count%2Cmedia_url%2Cpermalink%7D&access_token="+req.params.token};

  // REQUEST FOR EACH ELEMENT IN LIST NAME
  // const listName = [];
  // result.map((index) => {
    // const data = await request(host, endpoint(index.name), null, null, "GET");
    // console.log(index);
  // })

  // res.json('YO')
// }

module.exports = {
  getJson,
  getFeed
 }
