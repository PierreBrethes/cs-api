const request = require('./request.js');
const Spyinglist = require('../models/Spyinglist')
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

async function getFeed(id, req, res) {
  const result = (await Spyinglist
    .findAll({where: {idOwner: id}})
  )

  const endpoint = () => {return req.params.id+"?fields=follows_count%2Cmedia_count%2Cfollowers_count%2Cbusiness_discovery.username(design__addict)%2Cmedia%7Bid%2Clike_count%2Ccomments_count%2Cmedia_url%2Cpermalink%7D&access_token="+req.params.token};
  console.log(endpoint);
  const data = await request(host, endpoint(), null, null, "GET");

  res.json(data)
}

module.exports = {
  getJson
 }
