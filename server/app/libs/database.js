var lowdb = require('lowdb');
var db    = lowdb('db.json');

exports.LocationsDB = db('locations');
