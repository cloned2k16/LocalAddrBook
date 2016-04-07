'use strict';

describe('LocalAddrBook', function() {

    it      ('should bring you to the home page'                        , function() {
        browser.get('/#/add');
        expect(browser.getLocationAbsUrl()).toMatch("/");
    });
        
    it      ('should switch to the "/add" address page'                 , function() {
        browser.get('/');
        var lnk=element(by.id( 'addLnk'));
        lnk.click();
        expect(browser.getLocationAbsUrl()).toMatch("/add");
    });

    describe('check for validation messages to be in place'             , function() {
        beforeEach(function() {
        });

        var errMessages = element.all(by.css('div [ng-message]'));
      
        it('should show error in First Name', function() {
            expect(errMessages.get(0).getText()).toMatch('First Name is required');
        });

        it('should show error in Last Name', function() {
            expect(errMessages.get(1).getText()).toMatch('Last Name is required');
        });

        it('should show error in eMail', function() {
            expect(errMessages.get(2).getText()).toMatch('EMail is required');
        });

        it('should show error in country selection', function() {
            expect(errMessages.get(3).getText()).toMatch('Please select a location');
        });
        
    });
  
 
    describe('basic AddAddress Form validation'                         , function() {
        beforeEach(function() {
         //browser.pause(); 
        });
        
        var people      = element.all   (by.repeater    ('addr in newPeople'));
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
            
        });
        
         
        
       
    });

    
    //Here we go TDD :D
    describe('switch to Address List view and check the DB'             , function() { 
     it('should switch to list view page'                               , function() {
        var lnk=element(by.id( 'lstLnk'));
        lnk.click();
        expect(browser.getLocationAbsUrl()).toMatch("/");
      }); 
      
      var people      = element.all   (by.repeater    ('addr in people'));
      
      it('should have only 0 people in the list'                         , function() {
       expect(people.count()).toEqual(0); 
      });     
      
    });
    
    
    //TODO .... put more test here ...
});    

    