var emitcallback;
var locations = require('database').LocationsDB;

var mostcommonly = [1234, 1111, 0000, 1212, 7777, 1004, 2000, 4444, 2222, 6969, 9999, 3333, 5555, 6666, 1122, 1313, 8888, 4321, 2001, 1010];
var nserie = 20;

var current = false;
var currenttmp = {};
var clients = [];

function setClientKeys(client, keys) {
    for (var client in clients) {
        if (client.id == client)
        {
            client.keys = keys;
            client.lastview = Date.now();

            emitcallback('update info', { door: current.id, clients: clients });

            return true;
        }
    }

    clients.push({
        id: client,
        keys: keys,
        lastview: Date.now()
    });

    emitcallback('update info', { door: current.id, clients: clients });

    return true;
}

exports.getActiveLocation = function() {
    if (current !== false) return current.id;
    return false;
}

exports.activeLocation = function(locationid) {
    console.log("Activando puerta: " + locationid);

    if (current !== false) {
        console.log("Guardando puerta anterior: " + current.id);
        locations
            .chain()
            .find({ id: current.id })
            .assign(current)
            .value();
    }

    current = locations.find({ id: locationid });

    if (typeof current == 'undefined') {
        console.log("Puerta desconocida. No se ha activado nada.");
    }
    else {
        currenttmp = current.codes.series;
        return current;
    }
}

exports.getKeys = function(client) {
    if (typeof current == 'undefined') return false;

    if (!current.codes.commonly) {
        setClientKeys(client, mostcommonly);
        return mostcommonly;
    }

    var keys = [];
    var count = 0;

    for (var i = 9999; i >= 0; i++) {
        if (count <= nserie) {
            if (!currenttmp[i]) {
                keys.push(i);
                currenttmp[i] = true;
                count++;
            }
        }
        else {
            break;
        }
    }

    setClientKeys(client, keys);
    return keys;
}

exports.confirmKeys = function(client, keys) {
    for (var i in keys) {
        current.codes.series[i] = true;
    }

    setClientKeys(client, false);
}

exports.getClients = function() {
    return clients;
}

exports.config = function(cb) {
    emitcallback = cb;
}
