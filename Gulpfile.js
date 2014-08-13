var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserify = require('gulp-browserify'),
  concat = require('gulp-concat'),
  embedlr = require('gulp-embedlr'),
  refresh = require('gulp-livereload'),
  lrserver = require('tiny-lr')(),
  express = require('express'),
  livereload = require('connect-livereload')
  livereloadport = 35729,
  serverport = 5000;
 
//We only configure the server here and start it only when running the watch task
var server = express();
//Add livereload middleware before static-middleware
server.use(livereload({
  port: livereloadport
}));
server.use(express.static('./build'));


var paths = {
    src: {
        scripts: ['src/app/*.js', 'src/app/**/*.js'],
        html: ['src/app/**/*.html'],
        sass: ['src/scss/*.scss']
    },
    dest: {
        rootDir: 'assets',
        scripts:  'assets/js/',
        css: 'assets/css/'
    }
};

//Task for sass using libsass through gulp-sass
gulp.task('sass', function(){
  gulp.src(paths.src.sass)
    .pipe(sass())
    .pipe(gulp.dest(paths.dest.css))
    .pipe(refresh(lrserver));
});

//Task for processing js with browserify
gulp.task('browserify', function(){
  gulp.src(paths.src.scripts)
   .pipe(browserify())
   .pipe(concat('app.bundle.js'))
   .pipe(gulp.dest(paths.dest.scripts))
   .pipe(refresh(lrserver));

});

//Task for moving html-files to the build-dir
//added as a convenience to make sure this gulpfile works without much modification
gulp.task('html', function(){
  gulp.src(paths.src.html)
    .pipe(gulp.dest(paths.dest.rootDir))
    .pipe(refresh(lrserver));
});
 
//Convenience task for running a one-off build
gulp.task('build', function() {
  gulp.run('html', 'browserify', 'sass');
});
 
gulp.task('serve', function() {
  //Set up your static fileserver, which serves files in the build dir
  server.listen(serverport);
 
  //Set up your livereload server
  lrserver.listen(lrport);
});
 
gulp.task('watch', function() {
 
  //Add watching on sass-files
  gulp.watch(paths.src.sass, function() {
    gulp.run('sass');
  });
  
  //Add watching on js-files
  gulp.watch(paths.src.scripts, function() {
    gulp.run('browserify');
  });
 
  //Add watching on html-files
  gulp.watch(paths.src.html, function () {
    gulp.run('html');
  });
});
 
gulp.task('default', function () {
  gulp.run('build', 'serve', 'watch');
});