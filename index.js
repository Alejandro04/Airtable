var express = require('express');
var Airtable = require('airtable');
var bodyParser = require('body-parser');
var base = new Airtable({apiKey: 'keyoCwmZkTygShOak'}).base('app9koWQob3uxS8af');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/people', function (req, res) {

  base('People').select({
      maxRecords: 4 ,
      view: "Main View"
  }).eachPage(function page(records, fetchNextPage) {
  
  records.forEach(function(record) {
      console.log('Retrieved', record.get('Name'), record.get('Job Roles'));
  });

  fetchNextPage();
  
  }, function done(err) {
      if (err) { console.error(err); return; }
  });
});

app.get('/people/:id', function (req, res) {
    // id = recAJX94lqxdEmGLO
    base('People').find(req.params['id'], function(err, record) {
      if (err) { console.error(err); return; }
      console.log(record);
    });
});


app.post('/people', function (req, res) {
     base('People').create(req.body, function(err, record) {
        if (err) { console.error(err); return; }
        console.log(record.getId());
    });
});

app.put('/people/:id', function (req, res) {
    base('People').update(req.params['id'], req.body, function(err, record) {
        if (err) { console.error(err); return; }
        console.log(record.get('Name'));
    });
});

app.delete('/people/:id', function (req, res) {
    base('People').destroy(req.params['id'], function(err, deletedRecord) {
        if (err) { console.error(err); return; }
        console.log('Deleted record', deletedRecord.id);
    });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
