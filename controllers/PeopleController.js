var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyoCwmZkTygShOak'}).base('app9koWQob3uxS8af');
var tables = require('../tables')
const Utils = require('../utils/Utils');

responseData = function(people, res){
    const utilidades = new Utils();
    utilidades.responseData(people, res);
}
class PeopleController {

    find(){
        let people = [];
        return (req, res) => {      
            base(tables.People).select({
                maxRecords: 100,
                view: "Main View"
            }).eachPage(function page(records, fetchNextPage) { 
                records.forEach(function(record) {
                    people = [...people, {
                        id: record.id,
                        name: record.get('Name'),
                        job: record.get('Job Roles')
                    }]
                }); 
                fetchNextPage();  
                responseData(people, res);
            }, function done(err) {
                if (err) { console.error(err); return; }
            });
        }
    }

    findOne(){
        let people = {}
        return (req, res) => {      
            base(tables.People).find(req.params['id'], function(err, record) {
                if (err) { console.error(err); return; }

                people = {
                    id: record.id,
                    name: record.get('Name'),
                    job: record.get('Job Roles')
                }

                responseData(people, res);
            });
        }
    }

    create(){
        let people = {}
        return (req, res) => {  
            base(tables.People).create(req.body, function(err, record) {
                if (err) { console.error(err); return; }

                people = {
                    id: record.id,
                    name: record.get('Name'),
                    job: record.get('Job Roles')
                }

                responseData(people, res);
            });
        }
    }

    update(){
        let people = {}
        return (req, res) => {      
            base(tables.People).update(req.params['id'], req.body, function(err, record) {
                if (err) { console.error(err); return; }

                people = {
                    id: record.id,
                    name: record.get('Name'),
                }

                responseData(people, res);
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