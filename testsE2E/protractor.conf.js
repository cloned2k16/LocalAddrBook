exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],
  capabilities: {
    'browserName': 'chrome',
        'chromeOptions': {
            'args': ['show-fps-counter=true']
    }
    },
  x_multiCapabilities: [    { 'browserName': 'firefox'}
                        ,   { 'browserName': 'chrome'}
  ],

  baseUrl: 'http://localhost:1111/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
