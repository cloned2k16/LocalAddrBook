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
    _APP.addEl          = function (t,i)    { 
     var d=document;
     var e=d.createElement(t);
         e.id=i;
     return e;
    }   
    
    _APP.lazyLoad       = function (src)      { 
     this.log('require',src);
     var d = document;
     var e = d.querySelector("script[src*='"+src+"']");
     this.log(e);     
     if (!e) {
      var h = d.getElementsByTagName("head");
      var e=this.addEl('SCRIPT','reqScript');
      e.setAttribute('src', src);
      e.setAttribute('type', 'text/javascript');
      try { 
       d.body.appendChild(e);
      }
      catch (e){ this.log("can't append script",e); }; 
     }
     this.log(e);     
    }
// ---------------------------------------------------------------------------    
// ---------------------------------------------------------------------------------------------------------------------
    _APP.boot           = function (){
        _.log("BOOT..",_.log.verbose);
        _.byClass('addr-list').css('visibility','visible');
        
        _.COUNTRY_CODES     = HARD_CODED.COUNTRY_CODES; 
                       delete HARD_CODED.COUNTRY_CODES; //Make sure we don't use it anywhere else
        
        var DB              = _.MainCTRL.DB;
            DB.data         = DB.data || [];
            delete            DB.newPeople; // clean up whatever happens to left people there
        _.DB_COUNTRY_CODES  = DB.COUNTRY_CODES;
        
        
        _.log('storage count:',DB.data,DB.idx,_.log.debug);
        if (_.isLOGDebugEn()) {
            var str= '[';
            DB.data.forEach(function(a){ str=str+a+']['; });
            _.log('data:',str);
        }
        
        
        if (_.isND(_.REMOTE_COUNTRY_CODES)) { _.log("can't get country code from server.."        ,_.log.warning) 
         _.log('_.REMOTE_COUNTRY_CODES',_.REMOTE_COUNTRY_CODES,_.log.verbose);
         if (_.isND(_.DB_COUNTRY_CODES))    { _.log("can't get country code from local storage.." ,_.log.warning)
          _.log('_.DB_COUNTRY_CODES',_.DB_COUNTRY_CODES,_.log.verbose);
          if (_.isND(_.COUNTRY_CODES))      { _.log("can't get country code from code"            ,_.log.panic)  
           
            // DO PANIC!!
            _.log('something whent really wrong!!',_.log.panic);
           
          } else{ 
                  _.MainCTRL.scope.locations = _.COUNTRY_CODES;        _.log('country codes comes from: HARD CODED'       ,_.log.info);  
                  DB.COUNTRY_CODES = _.COUNTRY_CODES;
            }
         }  else{ 
                  _.MainCTRL.scope.locations = _.DB_COUNTRY_CODES;     _.log('country codes comes from: LOCAL STORAGE'    ,_.log.info);  
                  
            }
        }   else{ _.MainCTRL.scope.locations = _.REMOTE_COUNTRY_CODES; _.log('country codes comes from: SERVER'           ,_.log.info);  }
        
        _.log('locations:',_.MainCTRL.scope.locations,_.log.debug);
        
    };
    _APP.removeAll      = function() {   _.log('removeAll()',_.log.verbose); //Helper function
      _.AddressBookCTRL.DB.$reset();  
      location.reload();
    } 
// ---------------------------------------------------------------------------------------------------------------------
    var _ = _APP;
                {       _.LOG_LEVELS     = 0
                        | _APP.log.verbose .logT
                        //| _APP.log.debug   .logT
                        | _APP.log.info    .logT
                        //| _APP.log.warning .logT
                        | _APP.log.error   .logT
                        | _APP.log.panic   .logT
                        ;
    }


    var app = angular.module(   'app'                      //bootstrapping angular and adding ngStorage 'n' ngMessages modules
                            , [ 'ngStorage'
                            ,   'ngRoute'
                            ,   'ngAnimate'
                            ,   'ngMessages' ] 
                            );
                            
        app.config          (                         function($routeProvider){


            $routeProvider
                .when('/',{
                        templateUrl: 'book-list.html'
                })
                .when('/add',{
                        templateUrl: 'book-add.html'
                });


        });

        app.controller      ('MainController'     ,   function($scope,$localStorage,$http,$location){
            _.MainCTRL       = this;
            _.MainCTRL.scope = $scope;
            _.MainCTRL.DB    = $localStorage;
            
            _.log('MainCtrl:',$scope,_.log.verbose);
            $scope.message="here we go";  
            $scope.$on( "$routeChangeStart", function(event, next, current) {
                _.log("route changing..", event,next,current);
                if (_.isND(current) ) {
                    if ( '/' == next.$$route.originalPath ) {
                        
                    } 
                    else {
                        $location.path( "/" ); // send to root if entry page
                    }                
                }
                else if (_.isDF(next)) { // Both defined!
                 if ( (next.$$route.originalPath=='/') 
                    &&(current.$$route.originalPath=='/add') ){
                    _.log("clean up 'newPeople list",_.log.verbose);
                    delete $localStorage.newPeople;
                 }                    
                }
            });
            
            { //try to get country list online
            $http({   method: _.countryCodesGetVerb
                  ,   url: _.countryCodesURL })
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
                });
            };       

            $scope.removeAddress=function (idx,from ) { _.log('AddressBookCTRL::removeAddress',idx,from  ,_.log.debug);
                if (_.isND(from)){
                 _.log("ERROR: there's no people here!!",_.log.error);
                 return;
                }
                var len=from.length;
                for (var i=0; i<len; i++){
                    if (from[i].idx==idx) { 
                        from.splice(i,1);
                        break;
                    }
                }
            }
        });
 
        app.controller      ('AddressBookCTRL'    ,   function ($scope,$http,$localStorage){
            _.log('AddressBookCTRL:',$scope,$http,$localStorage,_.log.verbose);
            _.AddressBookCTRL       = this;
            _.AddressBookCTRL.scope = $scope;
            _.AddressBookCTRL.http  = $http;
            _.AddressBookCTRL.DB    = $localStorage;
            $scope.people           = $localStorage.people;
            
            $scope.removeAddress= function(idx) { 
             _.log("FormCTRL::removeAddress");
             _.MainCTRL.scope.removeAddress(idx,$localStorage.people); 
            };

        
        });
    
        app.controller      ('FormCTRL'           ,   function ($scope,$http,$localStorage,$sessionStorage){
            _.log('FormCTRL:',$scope,$http,$localStorage,$sessionStorage,_.log.verbose);
            _.FormCTRL          = this;
            _.FormCTRL.scope    = $scope;
            _.FormCTRL.http     = $http;
            _.FormCTRL.DB       = $localStorage;
            _.FormCTRL.session  = $sessionStorage;
            
            $scope.locations    = _.MainCTRL.scope.locations;
            $scope.newPeople    = $localStorage.newPeople;
       

            $scope.items        =  [ {id:''         ,label:'LIST VIEW'}
                                    ,{id:'addAddr'  ,label:'ADD ADDRESS'}
                                  //,{id:'editAddr' ,label:'EDIT'} 
                                ];
        
            $scope.selection    = $scope.items[_.default_view];

        
            $scope.data         = _.fillFormWithFakeData ?  {   firstName: 'Bob'                
                                                        ,       lastName:  'Bouwer'              
                                                        ,       eMail:     'Bob.Bouwer@nowhere.net'    
                                                        ,       country:   'ES'                 
                                                        } : {};

            $scope.removeAddress= function(idx) { 
             _.log("FormCTRL::removeAddress");
             _.MainCTRL.scope.removeAddress(idx,$localStorage.newPeople); 
            };
        
            $scope.submit       = function() { _.log('submit',data,_.log.debug);
                var data=$scope.data;
                //data.firstNameErr=data.lastNameErr=''; //clear errors;
                if (   typeof(data)              ==_.ND 
                    || typeof(data.firstName)    ==_.ND //required
                    || typeof(data.lastName)     ==_.ND //required
                    || typeof(data.eMail)        ==_.ND //required
                    || typeof(data.country)      ==_.ND //required
                ){
                    _.log('incomplete or wrong data',data,_.log.warning);
                    //if (typeof(data.firstName)    ==_.ND) data.firstNameErr='ERROR!';
                    //if (typeof(data.lastName )    ==_.ND) data.lastNameErr ='ERROR!';
                }
                else {
                    var DB=_.AddressBookCTRL.DB;
                        DB.idx =  _.isDF(DB.idx) ? DB.idx + 1 : 1;
                        _.log('adding address to local storage and model',data,DB.idx);//,_.log.info);
                        
                    var newA= {  idx         :   DB.idx
                             ,   firstName   :   data.firstName
                             ,   lastName    :   data.lastName
                             ,   eMail       :   data.eMail
                             ,   country     :   data.country
                             };
                    
                    DB.people        = DB.people    || [];                    
                    DB.newPeople     = DB.newPeople || [];

                    DB.people.push     (newA);     
                    DB.newPeople.push(newA);
                    $scope.newPeople=DB.newPeople;
           
                    _.AddressBookCTRL.scope.people=DB.people;
                }
         
        };
        

        
        
    });
    

 

