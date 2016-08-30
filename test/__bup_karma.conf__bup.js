module.exports = function(config) {
    config.set({
        basePath: '.',

        port: 9876,
        
        logLevel: config.LOG_INFO,
        
        colors: true,   

        singleRun: false,
        autoWatch: true,

        //'cucumberjs'
        frameworks: ['jasmine'],

        files: [
            // PhantomJS2 (and possibly others) might require it
            { pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false },

            //SystemJS
            {pattern: 'node_modules/systemjs/dist/system.js', included: true, watched: true},
            
            
            //Zone Stuff just in case
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',
            
            { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },
            { pattern: 'karma-test-shim.js', included: true, watched: true },


            // paths loaded via module imports
            {pattern: 'www/**/*.js', included: false, watched: true},

            // paths to support debugging with source maps in dev tools
            {pattern: 'app/**/*.ts', included: false, watched: false},
            {pattern: 'www/**/*.js.map', included: false, watched: false},

            //Cucumber Files
            //{pattern: 'node_modules/karma-cucumberjs/vendor/cucumber-html.css', watched: false, included: false, served: true},
            //{pattern: 'test/features/app.template', watched: false, included: false, served: true},

            //Acceptance Tests
            //{pattern: 'test/features/**/*.feature', watched: true, included: false, served: true},
            //{pattern: 'test/features/step_definitions/**/*.js', watched: true, included: true, served: true},

            //Mocks
            {pattern: 'test/specs/*.mock.ts', included: false, watched: true},

            //Unit Tests
            'test/specs/app.spec.js'
        ],

        proxies: {
          // required for component assests fetched by Angular's compiler
          "/app/": "/base/app/"
        },

        // Karma plugins loaded
        plugins: [
            'karma-jasmine',

            'karma-chrome-launcher',
            'karma-phantomjs-launcher',

            'karma-coverage',
            'karma-html-detailed-reporter',
            'karma-spec-reporter'
        ],

        //PhantomJS, Chrome
        browsers: ['PhantomJS'],

        //Configure reporters
        reporters: [
            'spec',
            'htmlDetailed',
            'coverage'
        ],

        // Source files that you wanna generate coverage for.
        // Do not include tests or libraries (these files will be instrumented by Istanbul)
        preprocessors: {
            'www/build/js/*.js': ['coverage']
        },

        //Configure reporters
        specReporter: {
            maxLogLines: 5,             // limit number of lines logged per test 
            suppressErrorSummary: true, // do not print error summary 
            suppressFailed: false,      // do not print information about failed tests 
            suppressPassed: false,      // do not print information about passed tests 
            suppressSkipped: true,      // do not print information about skipped tests 
            showSpecTiming: false       // print the time elapsed for each spec 
        },

        //karma-coverage coverage reporter, requires preprocessor above to be configured
        coverageReporter: {
            type: 'html',
            subdir: 'coverage', 
            dir: 'test'
        },

        htmlDetailed: {
            dir: './test/reports',
            splitResults: true  //splits results into seperate files for each browser
        }
    })
};
