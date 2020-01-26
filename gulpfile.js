/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

// Load plugins
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const browsersync = require('browser-sync').create();
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');

const paths = {
  out: './dist',
  htmlSrc: './app/index.html',
  sassSrc: './app/common.blocks/**/*.sass',
  jsSrc: './app/common.blocks/**/*.js',
  imgSrc: './app/img/*',
  levels: [
    'common.blocks',
    // 'desktop.blocks',
    // 'touch.blocks',
  ],
};

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: paths.out,
    },
    port: 3000,
  });
  done();
}

// Clean dist
function clean() {
  return del(['./dist/']);
}

// Compile Pug
function pugbuild() {
  return gulp
    .src('./app/common.blocks/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./app/common.blocks/'))
    .pipe(browsersync.stream());
}

function htmlbeautify() {
  const options = {
    indentSize: 2,
    unformatted: [
      // https://www.w3.org/TR/html5/dom.html#phrasing-content
      'abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite',
      'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins',
      'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript',
      'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small',
      'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text',
      'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt',
    ],
  };

  return gulp
    .src('./dist/pug/page/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./dist/beautyfy'));
}

// HTML task
function html() {
  return gulp
    .src(paths.htmlSrc)
    .pipe(rename('index.html'))
    .pipe(plumber())
    .pipe(gulp.dest(paths.out))
    .pipe(browsersync.stream());
}

// CSS task
function css() {
  return gulp
    .src(paths.sassSrc)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browsersync.stream());
}

// Transpile, concatenate and minify scripts
function js() {
  return gulp
    .src(paths.jsSrc)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('index.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/js/'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browsersync.stream());
}

// Optimize Images
function images() {
  return gulp
    .src(paths.imgSrc)
    .pipe(newer(paths.imgSrc))
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 5 }),
      ]),
    )
    .pipe(gulp.dest('./dist/img/'));
}

// Copy fonts
function fonts() {
  return gulp
    .src('./app/fonts/*.{woff,ttf}')
    .pipe(gulp.dest('./dist/fonts/'));
}

// Watch files
function watchFiles() {
  gulp.watch(paths.htmlSrc, html);
  gulp.watch(paths.sassSrc, css);
  gulp.watch(paths.jsSrc, js);
  gulp.watch(paths.imgSrc, images);
}

// define complex tasks
const build = gulp.series(clean, gulp.parallel(html, css, images, fonts, js));
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.pugbuild = pugbuild;
exports.htmlbeautify = htmlbeautify;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;
