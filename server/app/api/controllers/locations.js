var lowdb = require('lowdb')
var db    = lowdb('db.json')
var uuid  = require('uuid')

var locations = require('../../libs/database').LocationsDB;

exports.getLocations = function(req, res) {
    var locs = locations.value();
    res.status(200).jsonp(locs);
}

exports.addLocation = function(req, res) {
    var newlocation = {
        id: uuid(),
        name: req.body.name,
        pin: req.body.pin,
        codes: {
            commonly: false,
            series: {}
        }
    };

    for (var i = 0; i <= 9999; i++) {
        newlocation.codes.series[i] = false;
    }

    locations.push(newlocation);
    res.status(200).jsonp(newlocation);
}

exports.updateLocation = function(req, res) {
    var modlocation = {};
    if (typeof req.body.name != 'undefined') modlocation.name = req.body.name;
    if (typeof req.body.pin != 'undefined') modlocation.pin = req.body.pin;

    var newloc = locations
        .chain()
        .find({ id: req.params.id })
        .assign(modlocation)
        .value();

    res.status(200).jsonp(newloc);
}

exports.deleteLocation = function(req, res) {
    locations.remove({id: req.params.id});
    res.status(200).jsonp(req.params.id);
}
