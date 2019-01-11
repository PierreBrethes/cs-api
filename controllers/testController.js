const request = require('./request.js');

const host = "https://graph.facebook.com/v3.2/";
const access_token = "EAAIN3B5QQx4BAG84vRIn0TCCyDFtZCcKb7DA1SsophMcOAdBrHwJkkwqGqmuGHT3UhpvrF40ypJneMrnykMHc6ZCl0P3lXqcWlvpqNEuUTehNGreZASwfWa5ffgfy4LfjrZAq46bg8jnUmSRfBElUZAIBPZBIZAYkVD69irxruZBuoxhLB17c5xZAYu3EHzCAlCoZD";
const user = "17841407080160735";

async function getJson(req, res) {
  const endpoint = () => {return user+"?fields=follows_count%2Cmedia_count%2Cfollowers_count%2Cbusiness_discovery.username(design__addict)%2Cmedia%7Bid%2Clike_count%2Ccomments_count%2Cmedia_url%2Cpermalink%7D&access_token="+access_token};
  console.log(endpoint);
  const data = await request(host, endpoint(), null, null, "GET");

  res.json(data)
}

module.exports = {
  getJson
 }
