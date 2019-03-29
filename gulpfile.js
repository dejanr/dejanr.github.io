'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const rimraf = require('gulp-rimraf');
const gulpif = require('gulp-if');
const isProduction = process.env.NODE_ENV === 'production';

const clean = () => {
  return gulp.src(['dist/styles/*.css', 'dist/font/*']).pipe(rimraf());
};

const less = () => {
  return gulp
    .src('./src/styles/*.less')
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(
      require('gulp-less')({
        paths: ['./src/styles/'],
      }),
    )
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(gulp.dest('./dist/css/'));
};

const fonts = () => {
  return gulp.src('./src/fonts/**').pipe(gulp.dest('./dist/fonts/'));
};

const build = gulp.series(clean, less, fonts);

exports.clean = clean;
exports.less = less;
exports.fonts = fonts;
exports.build = build;
exports.default = build;
