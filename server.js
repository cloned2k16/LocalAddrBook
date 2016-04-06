// server.js

    // ====================================================== Set Up
    var express             = require('express');
    var app                 = express();     
    var router              = express.Router();     
    var morgan              = require('morgan');                            // log requests to the console (express4)
    // ====================================================== Configuration
    var _APP                = {};
        _APP.PUBLIC_HTML    = '/public_html'; 
        _APP.LISTEN_PORT    = 1111;
        _APP.log            = function log() { console.log.apply(this,arguments); }
        
    var _                   = _APP;
    // ====================================================== Application
    app.use(express.static(__dirname + _.PUBLIC_HTML));                     //
    app.use(morgan('dev'));                                                 // log every request to the console
    app.use(function(req, res){ res.sendStatus(404);});                     // simply NOT FOUND
    // ====================================================== Main Loop
    app.listen(_.LISTEN_PORT);
    _.log("Express server listening on http://localhost:"+_.LISTEN_PORT+"/");
 