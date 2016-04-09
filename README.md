LocalAddrBook
=============

A single Page App that stores your contact address to a local storage available offline
``` cli
the point of this version, is to try give to the end user a great UX,
by being able to have it working completely off line, 
so for whatever reason the app goes suddenly offline (even for a while),
almost everything will work just fine ... 
and last but not least, it works completely offline, 
so just open the html file straight away without hosting it anywere ..
```


__How to run it__ 

Either ..
* by just open "/public_html/index.html" file in your browser 
* by using npm start then pointing your browser to http://localhost:1111/


### Installation
* __On Windows__
``` cli
1 build_all.bat 
2 start.bat
3 testE2E.bat
``` 

* __On @nix__
``` cli 
1 npm install
2 (copy bower files to /js folder)
3 npm test
4 npm start
5 protractor testse2e/protractor.conf.js
``` 


