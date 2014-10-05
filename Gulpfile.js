'use strict';

var TINYLR_PORT = 35729,
    EXPRESS_PORT = 4000;

var gulp       = require('gulp'),
    sass       = require('gulp-ruby-sass'),
    minifycss  = require('gulp-minify-css'),
    rimraf     = require('gulp-rimraf'),
    gulpIgnore = require('gulp-ignore'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),

    path = {
        root: __dirname,
        src:       'src',
        style:     'src/style',
        deploy:    'deploy',
        build:     'build',
        test:      'test',
        bowerRoot: './bower_components'
    };


gulp.task('clean', function() {
    // dont read the contents of the file(s)
    return gulp.src([path.deploy, path.build], {read: false})
        .pipe(rimraf());
});

/**
 * Cleans development files
 */
gulp.task('clean-dev', ['clean'], function(){
    return gulp.src([path.src+'/**/*.css'], {read: false})
        .pipe(clean());
});

/**
 * Concats and minifies all javascript files into veganistan.js
 */
gulp.task('build-js', function() {
    var externalDependencies = [
            path.bowerRoot + '/angular/angular.js',
            path.bowerRoot + '/angular-ui-router/release/angular-ui-router.js',
            path.bowerRoot + '/angular-slugify/angular-slugify.js',
            path.bowerRoot + '/angular-google-maps/dist/angular-google-maps.js'
        ],
        projectDependencies = [
            path.src + '/**/*.js'
        ];


    return gulp.src(externalDependencies.concat(projectDependencies))
        .pipe(gulpIgnore.exclude('*.test.js'))
        .pipe(concat('veganistan.js'))
        .pipe(gulp.dest(path.build + '/script'));
});

/**
 * Copy HTML
 */
gulp.task('build-html', function() {
    return gulp.src(path.src + '/**/*.html')
        .pipe(gulp.dest(path.build));
});

/**
 * Copy img directory
 */
gulp.task('build-img', function() {
    return gulp.src(path.src + '/img/**/*.*')
        .pipe(gulp.dest(path.build + '/img'));
});

/**
 * Copy font-awesome fonts
 */
gulp.task('build-font', function() {
    gulp.src([path.bowerRoot+'/font-awesome/css/font-awesome.css'])
        .pipe(gulp.dest(path.build+'/style'));

    return gulp.src([path.bowerRoot+'/font-awesome/fonts/*.*', path.src+'/fonts/**/*.*'])
        .pipe(gulp.dest(path.build+'/fonts'));
});

/**
 * Compiles styles for development only.
 * Compiled styles will end up in src/ dir
 */
gulp.task('build-css', function() {
    return gulp.src(path.style + '/**.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(gulp.dest(path.src + '/style'))
        .pipe(minifycss())
        .pipe(gulp.dest(path.build + '/style'));
});


/**
 * Copies content from src into build
 */
gulp.task('build', ['build-js', 'build-html', 'build-img', 'build-font', 'build-css' ]);

/**
 * DEPLOY
 * Simply copy everything from build/ to deploy/
 * TODO: Add minification of code
 */
gulp.task('deploy', ['build'], function(){
    return gulp.src(path.build+'/**/*.*')
        .pipe(gulp.dest(path.deploy));
});


/**
 * Run a local HTTP server (node express) to try the web application.
 * You need to run the API server separately (it's in another project in Github)
 */
gulp.task('serve', ['build'], function() {
    var express = require('express'),
        app = express();

    app.use(require('connect-livereload')());
    app.use(express.static(path.build));
    app.listen(EXPRESS_PORT);
    console.log( 'Started express at port ' + EXPRESS_PORT + '...');
});

/**
 * Serves from the base root.
 * Don't build.
 */
gulp.task('serve-base', [], function() {
    var express = require('express'),
        app = express();

    app.use(require('connect-livereload')());
    app.use(express.static('src/app/webgl'));
    app.listen(EXPRESS_PORT);
    console.log( 'Started express at port ' + EXPRESS_PORT + '...');
});

/**
 * Watches source codes for any changes and runs the tinylr to refresh the page automatically
 */
gulp.task('watch', function() {

    var tinylr = require('tiny-lr')();

    tinylr.listen(TINYLR_PORT);
    console.info('Tiny Live Reload is listening on port ' + TINYLR_PORT + '...');

    gulp.watch(path.src+'/**/*.scss', function () {
        gulp.start('build-css');
    });

    gulp.watch(path.src+'/**/*.html', function(files){
        console.log('Changed:', files );
        gulp.start('build-html');
    });

    gulp.watch(path.src+'/**/*.js', function(files){
        console.log('Changed:', files );
        gulp.start('build-js');
    });

    return gulp.watch(path.build+'/**/*',  function (event) {
        tinylr.changed({
            body: {
                files: [require('path').relative(path.root, event.path)]
            }
        });
    });
});


/**
 * The default gulp task (when no special task is specified)
 */
gulp.task('default', ['serve', 'watch']);

