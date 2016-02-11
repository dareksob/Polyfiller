'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const setting = {
  src: 'src/*',
  dest: 'dest'
};

// all types of scripts
gulp.task('build', () => {

  // es5
  gulp.src(setting.src)
    .pipe(helper.pipeRename(''))
    .pipe(gulp.dest(setting.dest));

  // es5 min
  gulp.src(setting.src)
    .pipe(sourcemaps.init())
    .pipe(helper.pipeRename('.min'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(setting.dest));
});

const helper = {
  pipeRename: function(prefix) {
    return rename(function(path) {
      path.basename = `ds-${path.basename.toLowerCase()}${prefix}`;
      return path;
    });
  }
};