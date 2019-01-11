const fetch = require('node-fetch');

const request = async (_host, _endpoint, _token = null, _body = null, _method = 'GET', _content_type = 'application/json') => {
  const response = await fetch(_host+_endpoint, {
    method: _method,
    headers: {
      'Authorization': _token,
      'content-type': _content_type
    },
    body: _body
  })
  const json = await response.json();
  return json;
};

module.exports = request
