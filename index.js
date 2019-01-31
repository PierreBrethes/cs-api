const express = require('express')
const bodyParser = require('body-parser')
const pug = require('pug')
const path = require('path')
const app = express()
var mysql = require("mysql");
var Sequelize = require("sequelize");

const tplIndexPath = path.join(__dirname, 'views', 'index.pug')
const renderIndex = pug.compileFile(tplIndexPath)

var testRouter = require('./routes/mainRoute');

app.use(function(req, res, next){
	global.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'content-stream'
	});
	connection.connect();
	next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.get('/', function(req, res) {
  const html = renderIndex();
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write(html);
  res.end()
})

app.get('/testdb', function(req, res, next) {
	global.connection.query('SELECT * from spying-list', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

app.use('/', testRouter);

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
