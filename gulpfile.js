'use strict'

var gulp = require('gulp')
  , sourcemaps = require('gulp-sourcemaps')
  , rimraf = require('gulp-rimraf')
  , less = require('gulp-less')
  , gulpif = require('gulp-if')
  , browserSync = require('browser-sync')

var isProduction = process.env.NODE_ENV === 'production'

gulp.task('less', function() {
  return gulp.src('./src/styles/*.less')
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(less({
      paths: ['./src/styles/']
    }))
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('fonts', function() {
  return gulp.src('./src/fonts/**')
    .pipe(gulp.dest('./dist/fonts/'))
})

gulp.task('clean', function() {
  return gulp.src([
    'dist/styles/*.css'
  , 'dist/font/*'
  ]).pipe(rimraf())
})

gulp.task('watch', ['build'], function watchAssets() {
  gulp.watch('src/styles/**/*.less', ['less'])
})

gulp.task('sync', ['watch'], function () {
  browserSync({
    server: {
      baseDir: ['.']
    , index: 'index.html'
    }
    , port: 3000
    , files: [
        'index.html'
      , 'dist/css/**'
      ]
    , open: false
    , online: false
    , notify: false
  })
})

gulp.task('build', ['clean', 'less', 'fonts'])
gulp.task('default', ['build'])
