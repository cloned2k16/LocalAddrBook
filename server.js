// server.js

    // ====================================================== Set Up
    var express         = require('express');
    var app             = express();     
    var router          = express.Router();     
    var morgan          = require('morgan');                                // log requests to the console (express4)
    
                                                                   
    var DRY             = DRY       || {};                                  // collecting DRY Stuff here 
        DRY.APP         = DRY.APP   || {};
    
        DRY.log         = function log              (s)      {
            console.log.apply(this,arguments);
        }
    // ====================================================== Handy short-cuts 
    var _               = _         || {};
        _.LOG           = DRY.log;
    // ====================================================== Configuration
    var PUBLIC_HTML     = '/public_html'; 
        DRY.listenPort  = 1111;
    // ====================================================== Application
    app.use(express.static(__dirname + PUBLIC_HTML));                       //
    app.use(morgan('dev'));                                                 // log every request to the console
    app.use(function(req, res){ res.sendStatus(404);});                     // simply NOT FOUND
    // ====================================================== Main Loop
    app.listen(DRY.listenPort);
    DRY.log("Express server listening on http://localhost:"+DRY.listenPort+"/");
 