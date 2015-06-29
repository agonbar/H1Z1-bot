var express         = require('express')
var app             = express();
var http            = require('http').Server(app);
var path            = require('path');
var io              = require('socket.io')(http);

var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var winston         = require('winston');

var bruteforce      = require(path.join(__dirname, '/app/libs/bruteforce'));

var config          = require('./app/config');

function configure() {
    app.set('x-powered-by', config.name);

    // Permite devolver objetos JSON
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Simula metodos DELETE y PUT para REST
    app.use(methodOverride());

    // Permite servir ficheros estáticos
    app.use('/', express.static(__dirname + '/app/static'));

    // Estableciendo las rutas
    var router = express.Router();
    var locationsController = require('./app/api/controllers/locations');
    var bruteforceController = require('./app/api/controllers/bruteforce');

    router.route('/api/locations')
        .get(locationsController.getLocations)
        .post(locationsController.addLocation);

    router.route('/api/locations/:id')
        .put(locationsController.updateLocation)
        .delete(locationsController.deleteLocation);

    router.route('/api/bruteforce')
        .get(bruteforceController.getCurrent);

    router.route('/api/bruteforce/:id/active')
        .get(bruteforceController.activeBForce);

    router.route('/api/bruteforce/keys')
        .get(bruteforceController.getKeys)
        .post(bruteforceController.confirmKeys);

    // Iniciando conexiones de socket.io
    io.on('connection', function(socket){
        console.log('New web connection');
        socket.emit('update info', { door: bruteforce.getActiveLocation(), clients: bruteforce.getClients() });
    });

    var ioEmit = function(msgtype, msg) {
        console.log("Emitiendo " + JSON.stringify(msg));
        io.emit(msgtype, msg);
    }

    bruteforce.config(ioEmit);

    // Si otro no lo maneja
    router.route('*')
        .get(function (req, res) {
            res.sendFile(path.join(__dirname, '/app/static/index.html'));
        });

    // Iniciando el enrutador
    app.use('/', router);
}

// Handlers

process.on('SIGINT', function() {
    exports.stop();
    process.exit(0);
});

// Iniciando el servidor

exports.start = function () {
    winston.info("[server.js] Iniciando servidor web...");
    configure();

    // Iniciamos servidor HTTP
    http.listen(config.http.port, function(){
        winston.info("[server.js] Servicio HTTP iniciado (Puerto: " + config.http.port + ").");
    });
}

exports.stop = function () {
    winston.info("[server.js] Apagando servidor web...");
}

exports.start();
