var gulp            = require('gulp');
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    cssnano       = require('gulp-cssnano'),
    uglify          = require('gulp-uglify'),
    imagemin        = require('gulp-imagemin'),
    rename          = require('gulp-rename'),

    del             = require('del');

var gulpConf = {
    src: 'src',
    dist: 'dist',
    demo: 'demo'
}



/***
    CLEAN DIRECTORIES
***/
gulp.task('clean-js-dist', function () {
    del(gulpConf.dist + '/scripts/*');
});
gulp.task('clean-demo', function () {
    del(gulpConf.demo + '/scripts/*');
    del(gulpConf.demo + '/*.html');
    del(gulpConf.demo + '/styles/**/*.css');
});



/***
    JAVASCRIPT
***/

// dist
gulp.task('js-dist', ['clean-js-dist'], function() {
    gulp.src(gulpConf.src + '/js/imageloader.js')
        .pipe(uglify({
            mangle: true,
            compress: {
                drop_console: true
            }
        }))
        .on( "error", function( err ) {console.log(err);})
        .pipe(rename({
            suffix  : '.min'
        }))
        .pipe(gulp.dest(gulpConf.dist + '/scripts/'));
});

// demo
gulp.task('js-demo', function() {
    gulp.src(gulpConf.src + '/js/*.js')
        .pipe(uglify({
            mangle: true,
            compress: {
                drop_console: true
            }
        }))
        .on( "error", function( err ) {console.log(err);})
        .pipe(rename({
            suffix  : '.min'
        }))
        .pipe(gulp.dest(gulpConf.demo + '/scripts/'));

    gulp.src(gulpConf.src + '/js/main.js')
        .pipe(uglify({
            mangle: true,
            compress: {
                drop_console: true
            }
        }))
        .on( "error", function( err ) {console.log(err);})
        .pipe(rename({
            suffix  : '.min'
        }))
        .pipe(gulp.dest(gulpConf.demo + '/scripts/'));
});



/***
    IMAGES
***/
gulp.task('img-demo', function () {
    return gulp.src(gulpConf.src + '/images/{,*/}{,*/}{,*/}*')
        .pipe(imagemin())
        .pipe(gulp.dest(gulpConf.demo + '/images/'));
});



/***
    CSS
***/
gulp.task('sass-demo', function() {
  return gulp.src(gulpConf.src + '/sass/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['> 2%', 'last 4 versions', 'iOS 6'],
        cascade: false
    }))
    //.pipe(gulp.dest(gulpConf.demo + '/styles/'))
    .pipe(cssnano())
    .pipe(rename({
        suffix  : '.min'
    }))
    .on( "error", function( err ) {console.log(err);})
    .pipe(gulp.dest(gulpConf.demo + '/styles/'));
});



/***
    HTML
***/
gulp.task('html-demo', function() {
    return gulp.src(gulpConf.src + '/html/*.html')
        .pipe(gulp.dest(gulpConf.demo + '/'));
});



/***
    BUILD & WATCH
***/
gulp.task('demo', ['clean-demo', 'sass-demo', 'js-demo', 'html-demo']);

gulp.task('watch', function() {
    var watcher = gulp.watch(gulpConf.src + '/js/*.js', ['js-demo']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
