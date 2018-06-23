var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyoCwmZkTygShOak'}).base('app9koWQob3uxS8af');
var tables = require('../tables')

class PeopleController {
   
    find(){
        return (req, res) => {      
            base(tables.People).select({
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
        }
    }

    findOne(){
        return (req, res) => {      
            base(tables.People).find(req.params['id'], function(err, record) {
                if (err) { console.error(err); return; }
                console.log(record);
            });
        }
    }

    create(){
        return (req, res) => { 
            console.log(req.body)     
            base(tables.People).create(req.body, function(err, record) {
                if (err) { console.error(err); return; }
                console.log(record.getId());
            });
        }
    }

    update(){
        return (req, res) => {      
            base(tables.People).update(req.params['id'], req.body, function(err, record) {
                if (err) { console.error(err); return; }
                console.log(record.get('Name'));
            });
        }
    }

    delete(){
        return (req, res) => {      
            base(tables.People).destroy(req.params['id'], function(err, deletedRecord) {
                if (err) { console.error(err); return; }
                console.log('Deleted record', deletedRecord.id);
            });
        }
    }

}

module.exports = PeopleController;