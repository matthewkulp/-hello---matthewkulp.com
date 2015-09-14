var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function(){
	gulp.src(['app.css', 'carousel/carousel.css'])
		.pipe(autoprefixer())
		.pipe(gulp.dest('css_compiled/'))
});

gulp.task('watch', function(){
	gulp.watch(['app.css', 'carousel/carousel.css'], ['styles']);
});
