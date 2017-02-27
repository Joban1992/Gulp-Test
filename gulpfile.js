var gulp  = require('gulp'),
   jshint = require('gulp-jshint'),
   sourcemaps = require('gulp-sourcemaps'),
   uglify = require('gulp-uglify'),
   concat = require('gulp-concat'),
   minify = require('gulp-minify'),
   minifyCSS = require('gulp-minify-css'),
   rename = require('gulp-rename'),
   htmlmin = require('gulp-htmlmin'),
   inject = require('gulp-inject'),
   series = require('stream-series'),
   bowerFiles = require('main-bower-files'),
   mainBowerFiles = require('gulp-main-bower-files'),
   livereload = require('gulp-livereload')
   connect = require('gulp-connect')
   gulpif = require('gulp-if')
   filter = require('gulp-filter');
   
   

   
//Task
gulp.task('default',['connect', 'watch','main-bower-files-js', 'jshint', 'main-bower-files-css', 'css', 'createIndex'], function(){
	//return gutil.log('Gulp is Ended');
})

gulp.task('connect', function(){
	connect.server({
	  root:'./',
	  livereload:true
    });
})

var condition = function(file){
	console.log(file);
}
gulp.task('main-bower-files-js', function() {
	const jsFilter = filter('**/*.js', {restore: true});
    
    return (vendorJS = gulp.src('./bower.json')
        .pipe(mainBowerFiles())
		.pipe(jsFilter)
		.pipe(concat('vendor.min.js'))
		//.pipe(uglify())
		.pipe(rename('vendor.min.js'))
        .pipe(gulp.dest('./public/assets/javascript/'))
		);
});
gulp.task('main-bower-files-css', function() {
	const cssFilter = filter('**/*.css', {restore: true});
    return (vendorCSS = gulp.src('./bower.json')
        .pipe(mainBowerFiles())
		.pipe(cssFilter)
		.pipe(concat('vendor.min.css'))
		.pipe(minifyCSS())
		.pipe(rename('vendor.min.css'))
        .pipe(gulp.dest('./public/assets/css/'))
		);
});

var js, css, vendor;
gulp.task('jshint', function(){
	return (js = gulp.src(['source/javascript_joban/**/*.js'])
	.pipe(sourcemaps.init())
	.pipe(jshint())
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(sourcemaps.write()) 
	.pipe(rename('app.min.js'))
	.pipe(gulp.dest('./public/assets/javascript'))
	);
	//.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('html', function(){
	return gulp.src('source/**/*.html')
	//.pipe(sourcemaps.init())
	//.pipe(concat('index.html'))
	.pipe(htmlmin({collapseWhitespace: true}))
	//.pipe(sourcemaps.write()) 
	.pipe(rename('index.html'))
	.pipe(gulp.dest('public'))
});

gulp.task('css', function(){
	return (css = gulp.src('source/css/**/*.css')
	.pipe(concat('abc.css'))
	.pipe(minifyCSS())
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest('./public/assets/css'))
	);
});

gulp.task('createIndex', function(){
	//console.log(js)
 gulp.src('source/index.html')
 //.pipe(inject(gulp.src(bowerFiles()), {name: 'bower'}))
 .pipe(inject(series(vendorJS, vendorCSS, js, css)))
 //.pipe(htmlmin({collapseWhitespace:true}))
 .pipe(gulp.dest('./'))
 //.pipe(connect.reload());
});
 
gulp.task('watch', function(){
    gulp.watch('source/javascript_joban/**/*.js', ['jshint', 'createIndex']);
	gulp.watch('source/css/**/*.css', ['css', 'createIndex']);
	gulp.watch('index.html', ['createIndex']);
});