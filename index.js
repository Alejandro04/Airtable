var express = require('express');
var Airtable = require('airtable');
var bodyParser = require('body-parser');
const router = require('./routes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
