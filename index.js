const express = require('express')
const bodyParser = require('body-parser')
const pug = require('pug')
const path = require('path')
const app = express()

const tplIndexPath = path.join(__dirname, 'views', 'index.pug')
const renderIndex = pug.compileFile(tplIndexPath)

var testRouter = require('./routes/mainRoute');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ROUTES
app.get('/', function(req, res) {
  const html = renderIndex();
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write(html);
  res.end()
})

app.use('/', testRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
