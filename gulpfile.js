'use-strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');

gulp.task('styles', function(){
	gulp.src(['app.scss', 'carousel/carousel.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest('css_compiled/'))
});

gulp.task('watch', function(){
	gulp.watch(['app.scss', 'carousel/carousel.scss'], ['styles']);
});
