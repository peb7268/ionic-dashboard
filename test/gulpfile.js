"use strict";
var path_1 = require('path');
var config = {
    gulp: require('gulp'),
    appDir: 'app',
    testDir: 'test',
    testDest: './test',
    typingsDir: 'typings',
};
var imports = {
    gulp: require('gulp'),
    runSequence: require('run-sequence'),
    ionicGulpfile: require(path_1.join(process.cwd(), 'gulpfile.js')),
};
var gulp = imports.gulp;
var runSequence = imports.runSequence;
// just a hook into ionic's build
gulp.task('build-app', function (done) {
    runSequence('build', done);
});
// compile E2E typescript into individual files, project directoy structure is replicated under www/build/test
gulp.task('build-e2e', ['clean-e2e'], function () {
    var typescript = require('gulp-typescript');
    var tsProject = typescript.createProject('tsconfig.json');
    var src = [
        path_1.join(config.typingsDir, '/index.d.ts'),
        path_1.join(config.appDir, '**/*e2e.ts'),
    ];
    var result = gulp.src(src)
        .pipe(typescript(tsProject));
    return result.js
        .pipe(gulp.dest(config.testDest));
});
// delete _only_ tests generated on e2e.
// If we delete everything (using Ionic's `clean` task we'll wipe the newly built app we're testing against)
gulp.task('clean-e2e', function () {
    var del = require('del');
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del([config.testDest]).then(function (paths) {
        console.log('Deleted', paths && paths.join(', ') || '-');
    });
});
// run jasmine unit tests using karma with PhantomJS2 in single run mode
gulp.task('karma', function (done) {
    var karma = require('karma');
    var karmaOpts = {
        configFile: path_1.join(process.cwd(), config.testDir, 'karma.config.js'),
        singleRun: true,
    };
    new karma.Server(karmaOpts, done).start();
});
// run jasmine unit tests using karma with Chrome, Karma will be left open in Chrome for debug
gulp.task('karma-debug', function (done) {
    var karma = require('karma');
    var karmaOpts = {
        configFile: path_1.join(process.cwd(), config.testDir, 'karma.config.js'),
        singleRun: false,
        browsers: ['Chrome'],
        reporters: ['mocha'],
        browserify: {
            debug: true,
            plugin: [
                ['tsify'],
            ],
        },
    };
    new karma.Server(karmaOpts, done).start();
});
// run tslint against all typescript
gulp.task('lint', function () {
    var tslint = require('gulp-tslint');
    return gulp.src(path_1.join(config.appDir, '**/*.ts'))
        .pipe(tslint({
        formatter: 'verbose',
    }))
        .pipe(tslint.report());
});
// build unit tests, run unit tests, remap and report coverage
gulp.task('unit-test', function (done) {
    runSequence(['clean'], // Ionic's clean task, nukes the whole of www/build
    ['html'], 'karma', done);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJndWxwZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEscUJBQXFCLE1BQU0sQ0FBQyxDQUFBO0FBRTVCLElBQU0sTUFBTSxHQUFRO0lBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ3JCLE1BQU0sRUFBRSxLQUFLO0lBQ2IsT0FBTyxFQUFFLE1BQU07SUFDZixRQUFRLEVBQUUsUUFBUTtJQUNsQixVQUFVLEVBQUUsU0FBUztDQUN0QixDQUFDO0FBRUYsSUFBTSxPQUFPLEdBQVE7SUFDbkIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDckIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUM7SUFDcEMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxXQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0NBQzNELENBQUM7QUFFRixJQUFNLElBQUksR0FBUSxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQy9CLElBQU0sV0FBVyxHQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUM7QUFFN0MsaUNBQWlDO0FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQUMsSUFBYztJQUNwQyxXQUFXLENBQ1QsT0FBTyxFQUNELElBQUssQ0FDWixDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFFSCw4R0FBOEc7QUFDOUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRTtJQUNwQyxJQUFJLFVBQVUsR0FBUSxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRCxJQUFJLFNBQVMsR0FBUSxVQUFVLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQy9ELElBQUksR0FBRyxHQUFlO1FBQ3BCLFdBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQztRQUN0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