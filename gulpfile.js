'use strict';


//-------------------------------------------------------------------
// VARS
//-------------------------------------------------------------------

// plugins
var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var $ = require('gulp-load-plugins')();

// environments
var app = "app";
var dev = ".tmp";
var prod = "dist";

//folders
var styles = "assets/styles";
var scripts = "assets/scripts";
var images = "assets/images";
var icons = "assets/icons";
var fonts = "assets/fonts";
var template = "template";
var bower = "bower";

//font
var fontName = 'frontendler-icons';


//-------------------------------------------------------------------
// COMPILERS
//-------------------------------------------------------------------

gulp.task('styles',function() {
	
	return gulp.src( app + '/' + styles + '/**/*.scss')
		.pipe($.plumber())
		.pipe($.rubySass({
			style: 'expanded',
			precision: 10,
			debugInfo:false,
			lineNumbers:true,
			loadPath: [app]
			//sourcemap: true
		}))
		.pipe($.autoprefixer('> 5%', 'last 3 version', 'ie 9'))
		.pipe(gulp.dest( dev + '/' + styles))
		.pipe($.size());
});

gulp.task('scripts', function() {
	return gulp.src(app + '/' + scripts + '/**/*.js')
		.pipe($.plumber())
		.pipe($.jshint())
		.pipe($.jshint.reporter(require('jshint-stylish')))
		.pipe(gulp.dest(dev + '/' + scripts))
		.pipe($.size());
});

gulp.task('templates', function() {
	var YOUR_LOCALS = {};
	return gulp.src([ app+ '/' + template + '/**/*.jade', '!' +app + '/' + template + '/**/_*.jade'])
		.pipe($.plumber())
		.pipe($.size())
		.pipe($.jade({
			locals: YOUR_LOCALS,
			pretty: true,
			basedir: app+ '/' + template
		}))
		.pipe(gulp.dest(dev + '/'))
		.pipe($.size());
});

gulp.task('icons', function() {
	return gulp.src([app + '/' + icons + '/svg/**/*.svg'])
		.pipe($.plumber())
		.pipe($.iconfontCss({
			fontName: fontName,
			path: app + '/' + icons + '/_icons_template.scss',
			targetPath: '../_icons.scss',
			//fontPath: '../../icones/'
		}))
		.pipe($.iconfont({
			fontName: fontName
		}))
		.pipe(gulp.dest(app + '/' + icons + '/font' ));
});

gulp.task('fonts', function () {
	var streamqueue = require('streamqueue');
	return streamqueue({objectMode: true},
		gulp.src([app + '/' + fonts + '/**/*',app + "/" + bower + "/**/*"])
    )
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest(prod + '/' + fonts));
});

gulp.task('images', function() {
	return gulp.src(app + '/' + images + '/**/*')
		.pipe($.plumber())
		.pipe($.cache($.imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest(dev + '/' + images))
		.pipe($.size());
});

//-------------------------------------------------------------------
// WATCH
//-------------------------------------------------------------------

gulp.task('watch-clean', function() {
	return gulp.src([dev], {read: false})
	.pipe($.plumber())
	.pipe($.clean());
});

gulp.task('watch-copy-bower', function() {
	return gulp.src([app + '/' + bower + '/**/*.*'])
		.pipe($.plumber())
		.pipe(gulp.dest(dev + '/' + bower))
});

gulp.task('watch-copy-icons', function() {
	return gulp.src([app + '/' + icons + '/font/**/*.*'])
		.pipe($.plumber())
		.pipe(gulp.dest(dev + '/' + icons))
});

gulp.task('watch-connect', function() {
	var connect = require('connect');
	var app = connect()
		.use(require('connect-livereload')({
			port: 35729
		}))
		.use(connect.static(dev))
		.use(connect.directory(dev));
	require('http').createServer(app)
		.listen(8080)
		.on('listening', function() {
			$.util.log($.util.colors.green('Started connect web server on http://localhost:8080'));
			$.util.log($.util.colors.green('Waiting for changes ...'));
			//open browser
			require('opn')('http://localhost:8080/');
		});
});

gulp.task('watch', gulpsync.sync([
	'watch-clean',
	'icons',
	'styles',
	'scripts',
	'templates',
	'images',
	'watch-copy-icons',
	'watch-copy-bower',
	'watch-connect'],
	'watch'), function() {
	var server = $.livereload();
				
	// watch for changes
	gulp.watch([
		dev + '/**/*.html',
		dev + '/' + styles + '/**/*.css',
		dev + '/' + scripts + '/**/*.js',
		dev + '/' + images + '/**/*',
		'!' + dev + '/' + bower + '/**/*.*' 
	]).on('change', function(file) {
		server.changed(file.path);
	});
	gulp.watch( app + '/' +  template + '/**/*.jade', ['templates']);
	gulp.watch( [app + '/' + styles + '/**/*.scss',app + '/' + icons + '/**/*.scss'], ['styles']);
	gulp.watch( app + '/' + scripts + '/**/*.js', ['scripts']);
	gulp.watch( app + '/' + images + '/**/*', ['images']);
	
});


//-------------------------------------------------------------------
// BUILD
//-------------------------------------------------------------------

gulp.task('build-clean', function() {
	return gulp.src([prod,dev], {read: false})
	.pipe($.plumber())
	.pipe($.clean());
});

gulp.task('build-copy-bower', function() {
	return gulp.src([app + '/' + bower +  '/**/*.*'])
		.pipe($.plumber())
		.pipe(gulp.dest(dev + '/' + bower ))
});

gulp.task('build-copy-icons', function() {
	return gulp.src([app + '/' + icons + '/font/**/*.*'])
		.pipe($.plumber())
		.pipe(gulp.dest(dev + '/' + icons))
});

gulp.task('build-copy-others', function() {
	return gulp.src([
		dev + '/**/*.*',
		'!' + dev + '/**/*.html',
		'!' + dev + '/**/*.css',
		'!' + dev + '/**/*.js',
		'!' + dev + '/' + bower + '/**/*.*'
		])
		.pipe($.plumber())
		.pipe(gulp.dest(prod));	
});

gulp.task('build-html',function() {
	var jsFilter = $.filter('**/*.js');
	var cssFilter = $.filter('**/*.css');
	return gulp.src([dev + '/**/*.html','!'+dev + '/' + bower + '/**/*.*'])
		.pipe($.plumber())
		.pipe($.useref.assets())
		.pipe(jsFilter)
		.pipe($.uglify())
		.pipe(jsFilter.restore())
		.pipe(cssFilter)
		.pipe($.csso())
		.pipe(cssFilter.restore())
		.pipe($.useref.restore())
		.pipe($.useref())
		.pipe(gulp.dest(prod + '/'))
		.pipe($.size());
});
gulp.task('build-size',function() {
	return gulp.src(prod + '/**/*')
		.pipe($.plumber())
		.pipe($.size({title: 'build size:', gzip: true}));
});

gulp.task('build',gulpsync.sync([
	'build-clean',
	'icons',
	'styles',
	'scripts',
	'templates',
	'images',
	'fonts',
	'build-copy-bower',
	'build-copy-icons',
	'build-copy-others',
	'build-html',
	'build-size'],
	'build'),function(){
		$.util.log($.util.colors.green('Build Sucess!'));
		$.util.beep();
	});

gulp.task('default',['build'],function() {
	var connect = require('connect');
	var app = connect()
		.use(require('connect-livereload')({
			port: 35729
		}))
		.use(connect.static(prod))
		.use(connect.directory(prod));
	require('http').createServer(app)
		.listen(8080)
		.on('listening', function() {
			$.util.log($.util.colors.green('Started connect web server on http://localhost:8080'));
			require('opn')('http://localhost:8080/');
		});
});
