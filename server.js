// #!/bin/env node
//  //  OpenShift sample Node application
// var express = require('express');
// var fs = require('fs');


// /**
//  *  Define the sample application.
//  */
// var SampleApp = function() {

//     //  Scope.
//     var self = this;


//     /*  ================================================================  */
//     /*  Helper functions.                                                 */
//     /*  ================================================================  */

//     /**
//      *  Set up server IP address and port # using env variables/defaults.
//      */
//     self.setupVariables = function() {
//         //  Set the environment variables we need.
//         self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
//         self.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

//         if (typeof self.ipaddress === "undefined") {
//             //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
//             //  allows us to run/test the app locally.
//             console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
//             self.ipaddress = "127.0.0.1";
//         };
//     };


//     /**
//      *  Populate the cache.
//      */
//     self.populateCache = function() {
//         if (typeof self.zcache === "undefined") {
//             self.zcache = { 'index.html': '' };
//         }

//         //  Local cache for static content.
//         self.zcache['index.html'] = fs.readFileSync('./app/public/index.html');
//     };


//     /**
//      *  Retrieve entry (content) from cache.
//      *  @param {string} key  Key identifying content to retrieve from cache.
//      */
//     self.cache_get = function(key) {
//         return self.zcache[key]; };


//     /**
//      *  terminator === the termination handler
//      *  Terminate server on receipt of the specified signal.
//      *  @param {string} sig  Signal to terminate on.
//      */
//     self.terminator = function(sig) {
//         if (typeof sig === "string") {
//             console.log('%s: Received %s - terminating sample app ...',
//                 Date(Date.now()), sig);
//             process.exit(1);
//         }
//         console.log('%s: Node server stopped.', Date(Date.now()));
//     };


//     /**
//      *  Setup termination handlers (for exit and a list of signals).
//      */
//     self.setupTerminationHandlers = function() {
//         //  Process on exit and signals.
//         process.on('exit', function() { self.terminator(); });

//         // Removed 'SIGPIPE' from the list - bugz 852598.
//         ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
//             'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
//         ].forEach(function(element, index, array) {
//             process.on(element, function() { self.terminator(element); });
//         });
//     };


//     /*  ================================================================  */
//     /*  App server functions (main app logic here).                       */
//     /*  ================================================================  */

//     /**
//      *  Create the routing table entries + handlers for the application.
//      */
//     self.createRoutes = function() {
//         self.routes = {};

//         // self.routes['/asciimo'] = function(req, res) {
//         //     var link = "http://i.imgur.com/kmbjB.png";
//         //     res.send("<html><body><img src='" + link + "'></body></html>");
//         // };


//         // var publicDir = express.static(__dirname + '/public');
//         // app.use(publicDir); // set the static files location /public/img will be /img for users
//         // app.use('/js', express.static(__dirname + '/public/js'));
//         // app.use('/js/vendor', express.static(__dirname + '/public/js/vendor'));
//         // app.use('/img', express.static(__dirname + '/public/img'));
//         // app.use('/css', express.static(__dirname + '/public/css'));
//         // app.use('/css/vendor', express.static(__dirname + '/public/css/vendor'));
//         // app.use('/partials', express.static(__dirname + '/public/partials'));



//         self.routes['/'] = function(req, res) {
//             res.setHeader('Content-Type', 'text/html');
//             res.send(self.cache_get('index.html'));
//         };
//     };


//     /**
//      *  Initialize the server (express) and create the routes and register
//      *  the handlers.
//      */
//     self.initializeServer = function() {
//         self.createRoutes();
//         self.app = express.createServer();

//         //  Add handlers for the app (from the routes).
//         for (var r in self.routes) {
//             self.app.get(r, self.routes[r]);
//         }
//     };


//     /**
//      *  Initializes the sample application.
//      */
//     self.initialize = function() {
//         self.setupVariables();
//         self.populateCache();
//         self.setupTerminationHandlers();

//         // Create the express server and routes.
//         self.initializeServer();
//     };


//     /**
//      *  Start the server (starts up the sample application).
//      */
//     self.start = function() {
//         //  Start the app on the specific interface (and port).
//         self.app.listen(self.port, self.ipaddress, function() {
//             console.log('%s: Node server started on %s:%d ...',
//                 Date(Date.now()), self.ipaddress, self.port);
//         });
//     };

// }; /*  Sample Application.  */



// /**
//  *  main():  Main code.
//  */
// var zapp = new SampleApp();
// zapp.initialize();
// zapp.start();



// modules =================================================
var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

// var bodyParser = require('body-parser');
// var logger = require('logger');


var app = express();
var router = express.Router();


// configuration ===========================================

// config files
//  var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
var sslPort = process.env.SSLPORT || 4000; // set our port
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || port || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");


// mongoose.connect(db.url); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)

// var development = false;
// if (process.argv.length > 2 && process.argv[2] && (process.argv[2].indexOf('dev') >= 0)) {
//     development = true;
//     console.log("DEVELOPMENT version of site");
// } else {
//     console.log("PRODUCTION version of site");
//     app.use(function(req, res, next) {
//         if ((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
//             res.redirect('https://' + req.get('Host') + req.url);
//         } else
//             next();
//     });
// }
//app.use(requireHTTPS);
// app.use(bodyParser()); // have the ability to pull information from html in POST
// app.use(require('prerender-node').set('prerenderToken', 'sZDS6mJvB1OLpYcxG13X'));
var publicDir = express.static(__dirname + '/app/public');
app.use(publicDir); // set the static files location /public/img will be /img for users
app.use('/js', express.static(__dirname + '/app/public/js'));
app.use('/js/vendor', express.static(__dirname + '/app/public/js/vendor'));
app.use('/img', express.static(__dirname + '/app/public/img'));
app.use('/css', express.static(__dirname + '/app/public/css'));
app.use('/css/vendor', express.static(__dirname + '/app/public/css/vendor'));
app.use('/partials', express.static(__dirname + '/app/public/partials'));

app.use(function(req, res) {
    // Use res.sendfile, as it streams instead of reading the file into memory.
    res.sendFile(__dirname + '/app/public/index.html');
});

app.use('/', router);
// console.log("public directory for s3:" + publicDir)

http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
    console.log("✔ Express server listening at %s:%d ", app.get('ip'),app.get('port'));
    // server();
});

// app.get("*", function (req, res, next) {
//   if ()
// res.redirect("https://" + req.headers.host + "/" + req.path);
// });

// console.log('Magic happens on port ' + port); // shoutout to the user

exports = module.exports = app; // expose app
