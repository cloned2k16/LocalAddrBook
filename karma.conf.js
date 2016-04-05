 // Karma configuration
    module.exports = function(config) {
        config.set({

        basePath: '',

        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'
        ]//,'Chrome','Firefox']
        ,

        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],
        
        // list of files / patterns to load in the browser
        files: [
             'node_modules/chai/chai.js'
            ,'/node_modules/angular-mocks/angular-mocks.js'
            ,'public_html/**/*.js'
            ,'test/**/*.spec.js'
            ,'tests/**/*.spec.js'
        ],

        // list of files to exclude
        exclude: [
             '-'
            ,'public_html/country-list-master/**/'
            ,'public_html/js/angular-animate.js'
            ,'public_html/js/angular-messages.js'
            
            ,'public_html/js/angular.min.js'
            ,'public_html/js/ngstorage.min.js'
            ,'public_html/js/angular-animate.min.js'
            ,'public_html/js/angular-messages.min.js'
            
        
        ],

        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },

        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 2302,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

         // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false

        });
    };
  
