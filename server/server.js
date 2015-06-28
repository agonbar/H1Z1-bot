var express         = require('express')
var app             = express();
var http            = require('http').Server(app);
var io              = require('socket.io')(http);

var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var winston         = require('winston');

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

    router.route('/api/locations')
        .get(locationsController.getLocations)
        .post(locationsController.addLocation)
        .update(locationsController.updateLocation);

    // Iniciando conexiones de socket.io
    io.on('connection', function(socket){
      console.log('a user connected');
    });

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
    db.disconnect();
}

exports.start();
