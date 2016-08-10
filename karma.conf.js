module.exports = function(config) {
    config.set({
        basePath: '.',

        //'cucumberjs'
        frameworks: ['jasmine', 'cucumberjs'],

        files: [
            //SystemJS
            {pattern: 'node_modules/systemjs/dist/system.js', included: true, watched: true},
            
            
            //Zone Stuff just in case
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',

            { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

            //{pattern: 'karma-test-shim.js', included: true, watched: true},

            //Just in case
            { pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false }, // PhantomJS2 (and possibly others) might require it


            // paths loaded via module imports
            {pattern: 'www/**/*.js', included: false, watched: true},

            // paths to support debugging with source maps in dev tools
            {pattern: 'app/**/*.ts', included: false, watched: false},
            {pattern: 'www/**/*.js.map', included: false, watched: false},

            //Cucumber Files
            {pattern: 'node_modules/karma-cucumberjs/vendor/cucumber-html.css', watched: false, included: false, served: true},
            {pattern: 'test/features/app.template', watched: false, included: false, served: true},

            //Acceptance Tests
            {pattern: 'test/features/**/*.feature', watched: true, included: false, served: true},
            {pattern: 'test/features/step_definitions/**/*.js', watched: true, included: true, served: true},

            //Unit Tests
            'test/specs/app.spec.js'
        ],

        port: 9876,

        logLevel: config.LOG_INFO,

        colors: true,

        //PhantomJS, Chrome
        browsers: ['Chrome'],

        // Karma plugins loaded
        plugins: [
            'karma-jasmine',
            'karma-cucumberjs',

            'karma-chrome-launcher',
            'karma-phantomjs-launcher',

            'karma-coverage',
            'karma-html-detailed-reporter',
            'karma-spec-reporter'
        ],

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
            maxLogLines: 5,         // limit number of lines logged per test 
            suppressErrorSummary: true,  // do not print error summary 
            suppressFailed: false,  // do not print information about failed tests 
            suppressPassed: false,  // do not print information about passed tests 
            suppressSkipped: true,  // do not print information about skipped tests 
            showSpecTiming: false // print the time elapsed for each spec 
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
        },

        singleRun: false,
        autoWatch: true
    })
};
