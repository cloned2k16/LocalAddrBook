    describe('country-codes check', function() {

            it ('should have a list of countries', function (){
             expect(typeof(HARD_CODED.COUNTRY_CODES)).toEqual(typeof({}));
            }); 
            
            it ('should have a known length of 243', function (){
             expect(HARD_CODED.COUNTRY_CODES.length).toEqual(243);
            }); 

            it ('should have first country as being "AF"', function (){
             expect(HARD_CODED.COUNTRY_CODES[0].code).toEqual('AF');
            }); 
            
            it ('should have 66th country as being "ER"', function (){
             expect(HARD_CODED.COUNTRY_CODES[66].code).toEqual('ER');
            }); 
            
            it ('should have 107th country as being "Italy"', function (){
             expect(HARD_CODED.COUNTRY_CODES[107]).toEqual({name: 'Italy', code: 'IT'});
            }); 
            
    });        
 