'use strict';

describe('LocalAddrBook', function() {

        it ('should bring you to the home page', function() {
            browser.get('/#/add');
            expect(browser.getLocationAbsUrl()).toMatch("#");
        });
        
        it ('should stay on the home page', function() {
            browser.get('/');
            expect(browser.getLocationAbsUrl()).toMatch("#");
        });


    describe('FirstName error display'                                , function() {

        beforeEach(function() {
            browser.get('/');
        });


        it('should check errors in First Name', function() {
            expect(element.all(by.css('[ng-view] div')).first().getText()).
            toMatch('First Name is required');
        });

    });
  
    describe('LastName error display'                                 , function() {

        beforeEach(function() {
        browser.get('/');
        });


        it('should check errors in Last Name', function() {
            var el=element(by.id('lastNameErr'));
            expect(el.getText()).
            toMatch('Last Name is required');
        });
    

    });
  
    describe('AddAddress Form validation'                             , function() {
        beforeEach(function() {
         //browser.pause(); 
        });
  
        browser.get('/');
        var people      = element.all   (by.repeater    ('addr in people'));
        var form        = element       (by.id          ('formAddAddress'));
        var firstName   = element       (by.model       ('data.firstName' ));
        var lastName    = element       (by.model       ('data.lastName' ));
        var eMail       = element       (by.model       ('data.eMail'     ));
        var country     = element       (by.model       ('data.country'   ));
        
 
        it('should reject input if only FirstName is set'               , function() {
            firstName.sendKeys('jack');
            form.submit();
            expect(people.count()).toEqual(0); 
        });
    
        it('should reject input if only FirstName and LastName are set' , function() {
            lastName.sendKeys('sparrow');
            form.submit();
            expect(people.count()).toEqual(0); 
        });

        it('should reject input if country is still missing'            , function() {
            eMail.sendKeys('jack@sparrow');
            form.submit();
            expect(people.count()).toEqual(0); 
        });

        it('should finallly accept input'                               , function() {
            country.sendKeys('Italy',protractor.Key.ENTER);
            form.submit();
            expect(people.count()).toEqual(1); 
        });

        it('should stop accept input if FirstName is removed'           , function() {
            firstName.clear();
            form.submit();
            expect(people.count()).toEqual(1); 
        });
    
        it('should stop accept input if LastName is removed'            , function() {
            firstName.sendKeys('Paolo');
            lastName.clear();
            form.submit();
            expect(people.count()).toEqual(1); 
        });
    
        it('should stop accept input if Email is removed'               , function() {
            lastName.sendKeys('Lioy');
            eMail.clear();
            form.submit();
            expect(people.count()).toEqual(1); 
        });

        it('should stop accept input if Email is malformed'             , function() {
            eMail.sendKeys('badEmailAddr');
            form.submit();
            expect(people.count()).toEqual(1); 
        });

        it('should left no objecs after delete the first one'           , function() {
            var bttnByCSS=by.css         ('.addr-remove'   );
            expect(element.all  (bttnByCSS).count()).toEqual(1);
            element             (bttnByCSS).click();
            expect(people.count()).toEqual(0); 
            //browser.pause();
        });
        
        // .... and more ...
       
    });

    //TODO .... put more test here ...
});
    