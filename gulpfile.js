const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const del = require('del');

const gulpConf = {
    src: 'src',
    dist: 'dist'
}



/***
    CLEAN DIRECTORIES
***/
gulp.task('clean-js-dist', function () {
    del(gulpConf.dist);
});



/***
    JAVASCRIPT
***/

// dist
gulp.task('js-dist', ['clean-js-dist'], function() {
    gulp.src(gulpConf.src + '/js/imageloader.js')
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
