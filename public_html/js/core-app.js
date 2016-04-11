var _APP = { 
        desc:           "Off line Address Book with AngularJS"
       ,version:        "0.0.1"
    };
    _APP.greet                  = function(who){ return 'Hello! '+who; }
    
    _APP.ND                     = 'undefined';
    _APP.LOG_LEVELS             = 0xFF; // all enabled
    _APP.isND                   = function (a){ return typeof a === this.ND };
    _APP.isDF                   = function (a){ return typeof a !== this.ND };
    _APP.byClass                = function (c){ return angular.element(document.getElementsByClassName(c)); };
    
    _APP.default_view           = 1;
    _APP.fillFormWithFakeData   = 0;

    _APP.defaultGetVerb         = 'GET';
    _APP.countryCodesGetVerb    = _APP.defaultGetVerb;
    _APP.countryCodesURL        = './data/locations.json';
    
// Personal Logger  ----------------------------------------------------------    
    _APP.log            = function ()       { 
     var a = [];
     Array.prototype.push.apply( a, arguments );
     var type   =a[a.length-1];
     if (type && this.isDF(type.logT)) { 
      type=type.logT; 
      a.pop(); 
      var 
            v=this.log.verbose  .logT
        ,   d=this.log.debug    .logT
        ,   i=this.log.info     .logT
        ,   w=this.log.warning  .logT
        ,   e=this.log.error    .logT
        ,   p=this.log.panic    .logT
        ;
      var mask =  this.LOG_LEVELS;
      if (!(type &  mask)) return;// level is disabled!!
      
      switch (type) { //do some specific
        default:
            
      }   
     
     }
     Function.apply.call(console.log, console, [a]);
    };
    { //LOG levels
    _APP.log.verbose    ={logT: 1};
    _APP.log.debug      ={logT: 2};
    _APP.log.info       ={logT: 4};
    _APP.log.warn       ={logT: 8};
    _APP.log.warning    ={logT: 8};
    _APP.log.error      ={logT:16};
    _APP.log.panic      ={logT:32};
    }
    _APP.isLOGDebugEn   = function () { return this.LOG_LEVELS & this.log.debug    .logT; }
// ---------------------------------------------------------------------------    
    _APP.removeAll      = function() {   _.log('removeAll()',_.log.verbose); //Helper function
      _.AddressBookCTRL.DB.$reset();  
      location.reload();
    } 
// ---------------------------------------------------------------------------------------------------------------------
    var _ = _APP;
                {       _.LOG_LEVELS     = 0
                        //| _APP.log.verbose .logT
                        //| _APP.log.debug   .logT
                        | _APP.log.info    .logT
                        //| _APP.log.warning .logT
                        | _APP.log.error   .logT
                        | _APP.log.panic   .logT
                        ;
    }


    var app = angular.module(   'app'                      //bootstrapping angular and adding ngStorage 'n' ngMessages modules
                            , [ 'ngStorage'
                            ,   'ngAnimate'
                            ,   'ngMessages' ] 
                            );
    
    app.controller      ('AddressBookCTRL'    ,function ($scope,$http,$localStorage){
        _.log('AddressBookCTRL:',$scope,$http,$localStorage,_.log.verbose);
        _.AddressBookCTRL       =this;
        _.AddressBookCTRL.scope =$scope;
        _.AddressBookCTRL.DB    =$localStorage;
        
        $scope.people               = $localStorage.data;
        
        $scope.peopleLookUp         = function (id) {
         var ppl=$localStorage.data;
         var len= ppl.length;
         for (var i=0; i<len; i++) {
          if (ppl[i].idx==id) return ppl[i];
         }
         _.log("can't find any address having "+id+" as index" ,_.log.error);
         return _.ND;
        };
                
        $scope.editAddress          = function (idx) { _.log('editAddress',idx      );//,_.log.debug);
         var scope=_.FormCTRL.scope;
         scope.selection = scope.items[2];
         var addr =  this.peopleLookUp(idx);
         _.log('found:',addr);
         if (_.isDF(addr)) {
          scope.data.idx        = addr.idx;
          scope.data.firstName  = addr.firstName;
          scope.data.lastName   = addr.lastName;
          scope.data.eMail      = addr.eMail;
          scope.data.country    = addr.country;
         }
        };

        $scope.removeAddress        = function (idx) { _.log('removeAddress',idx    ,_.log.debug);
         var DB=$localStorage;
         var len=DB.data.length;
         for (var i=0; i<len; i++){
            if (DB.data[i].idx==idx) { 
             DB.data.splice(i,1);
             break;
            }
         }
        };
        
    });
    
    app.controller      ('FormCTRL'           ,function ($scope,$http,$localStorage,$sessionStorage){
        _.log('FormCTRL:',$scope,$http,$localStorage,$sessionStorage,_.log.verbose);
        _.FormCTRL          = this;
        _.FormCTRL.scope    = $scope;
       
        { //try to get country list online
            $http({   method:   _.countryCodesGetVerb
                  ,   url:      _.countryCodesURL       })
            .then(function(res) {
                _.log('http country codes:' , res.data            ,_.log.info);
                _.REMOTE_COUNTRY_CODES      = res.data;
                _.boot();
            }
            ,function(err){ 
                    if (err.status == -1 )  _.log('Cross Origin request ?¿'     ,err.status ,err.data    ,_.log.error);
               else if (err.status <0    )  _.log('Unexpected STATUS'           ,err.status ,err.data    ,_.log.error);
               else                         _.log(                               err.status ,err.data    ,_.log.error); 
              _.boot();
             } 
            );
        };       

        $scope.items        =  [ {id:''         ,label:'LIST ADDRESSES'}
                                ,{id:'addAddr'  ,label:'ADD  ADDRESS'}
                                ,{id:'editAddr' ,label:'EDIT ADDRESS'} 
                            ];
        
        $scope.selection    = $scope.items[_.default_view];

        $scope.cleanUpForm  = function  () {
         _.log("cleanUpForm", $scope.data ,_.log.debug);
         $scope.data={}; // clean up form data
        }
        
        $scope.data         = _.fillFormWithFakeData ?  {   firstName: 'Bob'                
                                            ,       lastName:  'Bouwer'              
                                            ,       eMail:     'Bob.Bouwer@nowhere.net'    
                                            ,       country:   'ES'                 
                                            } : {};

       
        
        $scope.submit = function() { _.log('submit',data                    ,_.log.debug);
         var data=$scope.data;
         var isAddAddr = true;
         if ($scope.selection.id=='editAddr'){
          _.log('submit of edit addr:',data);
          isAddAddr=false;
         }         
         
         if ( typeof(data)              ==_.ND 
           || typeof(data.firstName)    ==_.ND //required
           || typeof(data.lastName)     ==_.ND //required
           || typeof(data.eMail)        ==_.ND //required
           || typeof(data.country)      ==_.ND //required
           ){
           _.log('incomplete or wrong data',data,_.log.warning);
         
         }
         else {
            
            var DB=_.AddressBookCTRL.DB;
            var dataID = data.idx;
            
            if (isAddAddr) {
			 DB.idx =  (_.isDF(DB.idx) ? DB.idx + 1 : 1);
             dataID=DB.idx;
             _.log('adding address to local storage and model',data,dataID    ,_.log.info);
            } 
           
           var newA= {  idx         :   dataID
                    ,   firstName   :   data.firstName
                    ,   lastName    :   data.lastName
                    ,   eMail       :   data.eMail
                    ,   country     :   data.country
                    };
                    
           DB.data = DB.data || [];                    
           if (isAddAddr){
            DB.data.push(newA);                             
            _.AddressBookCTRL.scope.people=DB.data;
           }
           else {
            var people=DB.data;
            var len=people.length;
            for (var i=0; i<len; i++){
             if (people[i].idx==newA.idx){
              people[i]=newA;
             }
            }
           }
           
           
         }
         
        };
        
        
    });
    
    _APP.boot           = function (){
        _.log("BOOT..",_.log.verbose);
        _.byClass('addr-list').css('visibility','visible');
        
        _.COUNTRY_CODES     = HARD_CODED.COUNTRY_CODES; 
                       delete HARD_CODED.COUNTRY_CODES; //Make sure we don't use it anywhere else
        console.log("DB is:",_.AddressBookCTRL.DB);
        
        var DB              = _.AddressBookCTRL.DB;
            DB.data         = DB.data || [];
        _.DB_COUNTRY_CODES  = DB.COUNTRY_CODES;

        _.log('storage count:',DB.data,DB.idx,_.log.debug);
        if (_.isLOGDebugEn()) {
            var str= '[';
            DB.data.forEach(function(a){ str=str+a+']['; });
            _.log('data:',str);
        }
        
        
        if (_.isND(_.REMOTE_COUNTRY_CODES)) {   _.log("can't get country code from server.."            ,_.log.warning); 
                                                _.log('_.REMOTE_COUNTRY_CODES',_.REMOTE_COUNTRY_CODES   ,_.log.verbose);
         if (_.isND(_.DB_COUNTRY_CODES))    {   _.log("can't get country code from local storage.."     ,_.log.warning);
                                                _.log('_.DB_COUNTRY_CODES',_.DB_COUNTRY_CODES           ,_.log.verbose);
          if (_.isND(_.COUNTRY_CODES))      {   _.log("can't get country code from code"                ,_.log.panic);  
                                                _.log('something went really wrong!!'                   ,_.log.panic);
            // DO PANIC !!
                                                
           
          } 
          else{ 
                  _.FormCTRL.scope.locations = _.COUNTRY_CODES;     _.log('country codes came from: HARD CODED'       ,_.log.info);  
                  DB.COUNTRY_CODES = _.COUNTRY_CODES;
          }
         }  
         else{ 
                  _.FormCTRL.scope.locations = _.DB_COUNTRY_CODES;  _.log('country codes came from: LOCAL STORAGE'    ,_.log.info);  
                  
         }
        }   
        else{ _.FormCTRL.scope.locations = _.REMOTE_COUNTRY_CODES;  _.log('country codes came from: SERVER'           ,_.log.info);  
        }
        
    };

 

