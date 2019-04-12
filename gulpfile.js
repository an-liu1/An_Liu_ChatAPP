var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyjs = require('gulp-js-minify');

gulp.task('minify-js', function(){
  gulp.src('./js/app.js')
    .pipe(minifyjs())
    .pipe(gulp.dest('./js'));
});

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
  .pipe(sass({outputStyle : 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('./public/css'));
});


gulp.task('sass:watch', function()
{
gulp.watch('.sass/**/*.scss', ['sass']);
});
