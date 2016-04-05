    describe('global', function() {
            
            it ("angular should tell version 1.5.3 ", function (){
             expect(angular.version.full).toEqual('1.5.3');
            }); 

            it ('should have default view set to 1', function (){
             expect(_APP.default_view).toEqual(1);
            }); 
            
            
    });        

