let preprocessor = 'sass';

const {src, dest, parallel, series, watch} = require('gulp'),
      browserSync  = require('browser-sync').create(),
      concat       = require('gulp-concat'),
      uglify       = require('gulp-uglify-es').default,
      sass         = require('gulp-sass'),
      less         = require('gulp-less'),
      scss         = require('gulp-scss'),
      autoprefixer = require('gulp-autoprefixer'),
      cleancss     = require('gulp-clean-css'),
      imagemin     = require('gulp-imagemin'),
      newer        = require('gulp-newer'),
      del          = require('del');

function browsersync(){
  browserSync.init({
    server: {baseDir: 'src/'},
    notify: false,
    online: true
  })
}

function script(){
  return src([
    'src/js/script.js'
  ])
  .pipe(concat('script.min.js'))
  .pipe(uglify())
  .pipe(dest('src/js/'))
  .pipe(browserSync.stream())
};

function style(){
  return src('src/' + preprocessor + '/style.' + preprocessor + '')
  .pipe(eval(preprocessor)())
  .pipe(concat('style.min.css'))
  .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true}))
  .pipe(cleancss(({level: {1: {specialComments: 0}},/* format: 'beautify'*/})))
  .pipe(dest('src/css'))
  .pipe(browserSync.stream())
}

function images(){
  return src('src/images/src/**/*')
  .pipe(newer('src/images/'))
  .pipe(imagemin())
  .pipe(dest('src/images/'))
}

function cleanimg(){
  return del('src/images/**/*', '!src/images/src/**/*')
}

function cleandist(){
  return del('dist/**/*')
}

function build(){
  return src([
    'src/css/**/*.min.css',
    'src/js/**/*.min.js',
    'src/images/**/*',
    '!src/images/src/**/*',
    'src/**/*.html'
    ], {base: 'src'})
  .pipe(dest('dist'))
}

function startwatch(){
  watch(['src/' + preprocessor + '/*.' + preprocessor + ''], style)
  watch(['src/**/*.js', '!src/**/*.min.js'], script)
  watch(['src/**/*.html']).on('change', browserSync.reload)
  watch('src/images/src/**/*', images) 
}

exports.browsersync = browsersync
exports.script      = script
exports.style       = style
exports.images      = images
exports.cleanimg    = cleanimg
exports.build       = series(cleandist, style, script, images, build)

exports.default     = parallel(style, script, images, browsersync, startwatch)
