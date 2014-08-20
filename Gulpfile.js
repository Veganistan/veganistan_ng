var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    liveReloadPort = 35729,
    tinylr;


gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: liveReloadPort}));
  app.use(express.static(__dirname));
  app.listen(8000);
});

gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(liveReloadPort);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('styles-dev', function() {
      return gulp.src('src/style/*.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('src/style'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('src/style'));
});

gulp.task('watch', function() {
  gulp.watch('src/style/*.scss', ['styles-dev']);
  gulp.watch('src/**/*.html', notifyLiveReload);
  gulp.watch('src/style/*.css', notifyLiveReload);
});

gulp.task('default', ['express', 'livereload', 'watch'], function() {});