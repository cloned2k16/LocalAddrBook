exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],
  x_capabilities: {
    'browserName': 'chrome',
        'chromeOptions': {
            'args': ['show-fps-counter=true']
    }
    },
  multiCapabilities: [    { 'browserName': 'firefox'}
                        ,   { 'browserName': 'chrome'}
  ],

  baseUrl: 'http://localhost:1111/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
