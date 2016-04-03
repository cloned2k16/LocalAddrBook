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
_.LOG('here we go ..');