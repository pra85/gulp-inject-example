var inject = require('gulp-inject'),
	gulp = require('gulp'),
    path = require('path');

gulp.task('build', function () {
	injects();
});
gulp.task('injects', injects);
function injects() {
        gulp.src(path.normalize('./frontend/src/*.js'))
        .pipe(gulp.dest(path.normalize('./build/static')));
		gulp.src(path.normalize('./app/index.html'))
	    .pipe(inject(
            gulp.src([path.normalize('./frontend/src/*.js')], {read: false}), {
                transform : function ( filePath, file, i, length ) {
                     var newPath = filePath.replace(path.normalize('/frontend/src'), '');
                     console.log('inject script = '+ newPath);
                     return '<script src="/static' + newPath  + '"></script>';
                }
            }
        ))
        .pipe(gulp.dest('./build'));
}
