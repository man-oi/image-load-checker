var gulp            = require('gulp');
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifyCSS       = require('gulp-minify-css'),
    uglify          = require('gulp-uglify'),
    imagemin        = require('gulp-imagemin'),
    rename          = require('gulp-rename'),

    del             = require('del');

var gulpConf = {
    srcc: 'src',
    dist: 'dist',
    demo: 'demo'
}


gulp.task('demo', ['clean-css-demo', 'clean-js-demo', 'sass-demo', 'js-demo']);



/***
    CLEAN DIRECTORIES
***/
gulp.task('clean-css-demo', function () {
    del(gulpConf.demo + '/styles/**/*.css');
});
gulp.task('clean-js-dist', function () {
    del(gulpConf.dist + '/scripts/*');
});
gulp.task('clean-js-demo', function () {
    del(gulpConf.demo + '/scripts/*');
});



/***
    JAVASCRIPT
***/

// dist
gulp.task('js-dist', ['clean-js-dist'], function() {
    gulp.src(gulpConf.srcc + '/js/image-load-checker.js')
        .pipe(gulp.dest(gulpConf.dist + '/scripts/'))
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
gulp.task('js-demo', ['clean-js-demo'], function() {
    gulp.src(gulpConf.srcc + '/js/*.js')
        .pipe(gulp.dest(gulpConf.demo + '/scripts/'))
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

    gulp.src(gulpConf.srcc + '/js/main.js')
        .pipe(gulp.dest(gulpConf.demo + '/scripts/'))
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
    return gulp.src(gulpConf.srcc + '/images/{,*/}{,*/}{,*/}*')
        .pipe(imagemin())
        .pipe(gulp.dest(gulpConf.demo + '/images/'));
});



/***
    CSS
***/
gulp.task('sass-demo', ['clean-css-demo'], function() {
  return gulp.src(gulpConf.srcc + '/sass/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['> 2%', 'last 4 versions', 'iOS 6'],
        cascade: false
    }))
    .pipe(gulp.dest(gulpConf.demo + '/styles/'))
    .pipe(minifyCSS())
    .pipe(rename({
        suffix  : '.min'
    }))
    .on( "error", function( err ) {console.log(err);})
    .pipe(gulp.dest(gulpConf.demo + '/styles/'));
});






gulp.task('watch', function() {
    var watcher = gulp.watch(gulpConf.srcc + '/js/*.js', ['js-demo']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
