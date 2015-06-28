var lowdb = require('lowdb')
var db    = lowdb('db.json')
var uuid  = require('uuid')

var locations = db('locations');

exports.getLocations = function(req, res) {
  var locs = locations.value();
  res.status(200).jsonp(locs);
}

exports.addLocation = function(req, res) {
  locations.push({id: uuid(), name: req.body.name, pin: req.body.pin, active: req.body.active});
  res.status(200);
}

exports.updateLocation = function(req, res) {
  locations
    .chain()
    .find({ id: req.params.id })
    .assign({ name: req.body.name, pin: req.body.pin, active: req.body.active})
    .value();
  res.status(200);
}
