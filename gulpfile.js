'use strict';


//-------------------------------------------------------------------
// VARS
//-------------------------------------------------------------------

// plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;


//-------------------------------------------------------------------
// SETUP
//-------------------------------------------------------------------

// environments
var app = 'app';
var dev = '.tmp';
var prod = 'dist';

//folders
var styles = 'assets/styles';
var scripts = 'assets/scripts';
var images = 'assets/images';
var icons = 'assets/icons';
var fonts = 'assets/fonts';
var template = 'template';

//font
var fontName = 'frontendler-icons';

var AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

//-------------------------------------------------------------------
// TASKS
//-------------------------------------------------------------------

gulp.task('styles',function() {
	return gulp.src( app + '/' + styles + '/**/*.scss')
		.pipe(plugins.plumber())
		//.pipe(plugins.changed(app + '/' + styles, {extension: '.scss'}))
		.pipe(plugins.rubySass({
			style: 'expanded',
			precision: 10,
			loadPath: [app]
		}))
		.pipe(plugins.autoprefixer(AUTOPREFIXER_BROWSERS))
		.pipe(gulp.dest( dev + '/' + styles))
        .pipe(reload({stream:true}))
        .pipe(plugins.size({title: 'styles'}));
});

gulp.task('scripts', function() {
	return gulp.src(app + '/' + scripts + '/**/*.js')
		.pipe(plugins.plumber())
		.pipe(reload({stream: true, once: true}))
	    .pipe(plugins.jshint())
	    .pipe(plugins.jshint.reporter('jshint-stylish'))
	    .pipe(plugins.if(!browserSync.active, plugins.jshint.reporter('fail')));
});

gulp.task('templates', function() {
	var YOUR_LOCALS = {};
	return gulp.src([ app+ '/' + template + '/**/*.jade', '!' +app + '/' + template + '/**/_*.jade'])
		.pipe(plugins.plumber())
		.pipe(plugins.jade({
			locals: YOUR_LOCALS,
			pretty: true,
			basedir: app+ '/' + template
		}))
		.pipe(gulp.dest(dev + '/'))
		.pipe(plugins.size({title: 'template'}));
});

gulp.task('icons', function() {
	return gulp.src([app + '/' + icons + '/svg/**/*.svg'])
		.pipe(plugins.plumber())
		.pipe(plugins.iconfontCss({
			fontName: fontName,
			path: app + '/' + icons + '/_icons_template.scss',
			targetPath: '_icons.scss',
			fontPath:  '../icons/'
		}))
		.pipe(plugins.iconfont({
			fontName: fontName
		}))
		.pipe(gulp.dest(app + '/' + icons ))
		.pipe(plugins.size({title: 'icons'}));
});

gulp.task('images', function() {
	return gulp.src(app + '/' + images + '/**/*')
		.pipe(plugins.plumber())
		.pipe(plugins.cache(plugins.imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest(prod + '/' + images))
		.pipe(plugins.size());
});

gulp.task('html',function() {
	var assets = plugins.useref.assets({searchPath: '{' + dev + ',' + app + '}' });
	return gulp.src([dev + '/**/*.html'])
		.pipe(plugins.plumber())
		.pipe(assets)
		.pipe(plugins.if('*.js', plugins.uglify()))
		.pipe(plugins.if('*.css', plugins.csso()))
		.pipe(assets.restore())
    	.pipe(plugins.useref())
        .pipe(plugins.if('*.html', plugins.minifyHtml()))
		.pipe(gulp.dest(prod + '/'))
		.pipe(plugins.size({title: 'html'}));
});

//-------------------------------------------------------------------
// WATCH
//-------------------------------------------------------------------


gulp.task('clean:dev', del.bind(null, [dev]));
gulp.task('serve:dev', function () {

	browserSync({
		notify: true,
		logFileChanges:true,
		//tunnel: 'frontendler',
		port:9000,
		server: {
			baseDir: [dev,app]
		}
	});

	gulp.watch( [app + '/' + template + '/**/*.jade'], ['templates',reload]);
	gulp.watch( [app + '/' + styles + '/**/*.scss',app + '/' + icons + '/**/*.scss'], ['styles']);
	gulp.watch( [app + '/' + scripts + '/**/*.js'], ['scripts',reload]);
	gulp.watch( [app + '/' + images + '/**/*'], [reload]);
	gulp.watch( [app + '/' + icons + '/svg/**/*.svg'], ['icons',reload]);
	gulp.watch( [app + '/' + fonts + '**/*'], ['fonts',reload]);

});

gulp.task('watch',['clean:dev'],function(cb) {
	runSequence(['styles','templates'],'serve:dev',cb);
});

//-------------------------------------------------------------------
// BUILD
//-------------------------------------------------------------------

gulp.task('clean:prod', del.bind(null, [prod]));
gulp.task('copy:prod', function() {
	gulp.src(app + '/' + icons + '/*.{eot,svg,ttf,woff}')
		.pipe(gulp.dest(prod + '/' + icons));
    gulp.src(app + '/' + fonts + '/**/*.{eot,svg,ttf,woff}')
        .pipe(gulp.dest(prod + '/' + fonts));
    gulp.src([app + '/*.*'],{ dot: true })
        .pipe(gulp.dest(prod));
});

gulp.task('build',['clean:prod'],function(cb){
	runSequence(['styles','scripts','templates','images','copy:prod'],'html', cb);
});

// Run PageSpeed Insights
// Update `url` below to the public URL for your site
gulp.task('pagespeed', pagespeed.bind(null, {
  // By default, we use the PageSpeed Insights
  // free (no API key) tier. You can use a Google
  // Developer API key if you have one. See
  // http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
  url: 'https://frontendler.com.br'
  // strategy: 'mobile'
}));
