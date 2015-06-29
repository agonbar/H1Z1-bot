var actualLocation = false;

var libbforce = require('../../libs/bruteforce');

exports.getCurrent = function(req, res) {
    res.status(200).jsonp(libbforce.getActiveLocation());
}

exports.getKeys = function(req, res) {
    res.status(200).jsonp(libbforce.getKeys(req.connection.remoteAddress));
}

exports.confirmKeys = function(req, res) {
    res.status(200).jsonp(actualLocation);
}

exports.activeBForce = function(req, res) {
    libbforce.activeLocation(req.params.id);
    res.status(200).jsonp(libbforce.getActiveLocation());
}
