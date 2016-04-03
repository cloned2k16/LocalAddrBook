var _APP    = { 
        name:           "LocalAddrBook"
       ,desc:           "A single Page App that stores your contact address to a local storage available offline"
       ,version:        "0.0.1"
    };

    _APP.greet          =function(who)  { return 'Hello! '+who; }
    
    _APP.ND             = 'undefined';

    _APP.log            = function ()   { Function.apply.call(console.log, console, [arguments]); };

var _       =   _APP;

_.log('starting..',_.name);        