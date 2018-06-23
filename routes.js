const router = require('express').Router();
const PeopleController = require('./controllers/PeopleController');

// Add the controllers we need
const people = new PeopleController('People');

// Add the endpoints for controller
router.get('/people', people.find(), (req, res) => res.jsonp(req.result));
router.get('/people/:id', people.findOne(), (req, res) => res.jsonp(req.result));
router.post('/people', people.create(), (req, res) => res.jsonp(req.result));
router.put('/people/:id', people.update(), (req, res) => res.jsonp(req.result));
router.delete('/people/:id', people.delete(), (req, res) => res.jsonp(req.result));

module.exports = router;