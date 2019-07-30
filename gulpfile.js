const gulp = require('gulp');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');

const browserSync = require('browser-sync');
const del = require('del');

const gulpConf = {
  src: 'src',
  dist: 'dist'
}



/***
    CLEAN
***/
const cleanDist = (done) => {
  del(gulpConf.dist)
    .then((paths) => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
      done();
    });
}
gulp.task('cleanDist', cleanDist);



/***
    DEV SERVER
***/
const server = browserSync.create();

const reload = (done) => {
  server.reload();
  done();
}

const serve = (done) => {
  server.init({
    server: {
      baseDir: './dist/'
    }
  });
  done();
}



/***
    BUILD
***/
const buildJS = () => {
  return gulp.src(`${gulpConf.src}/js/*.js`)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest(gulpConf.dist));
}
gulp.task('buildJS', buildJS);

const minifyHTML = () => {
  return gulp.src(`${gulpConf.src}/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(gulpConf.dist));
}
gulp.task('minifyHTML', minifyHTML);



/***
    TASKS
***/
const dev = gulp.series(
  cleanDist,
  gulp.parallel(minifyHTML, buildJS),
  serve,
);
gulp.task('dev', dev);
