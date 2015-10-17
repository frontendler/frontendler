//-------------------------------------------------------------------
// PLUGINS
//-------------------------------------------------------------------

// plugins
var gulp = require("gulp"),
    plugins = require("gulp-load-plugins")(),
    del = require("del"),
    runSequence = require("run-sequence"),
    browserSync = require("browser-sync"),
    pagespeed = require("psi");


//-------------------------------------------------------------------
// SETUP
//-------------------------------------------------------------------

// environments
var app = "app";
var dev = ".tmp";
var prod = "dist";

//folders
var styles = "assets/styles";
var scripts = "assets/scripts";
var images = "assets/images";
var fonts = "assets/fonts";
var template = "template";

var AUTOPREFIXER_BROWSERS = [
    "ie >= 9",
    "ie_mob >= 10",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 7",
    "opera >= 23",
    "ios >= 7",
    "android >= 4",
    "bb >= 10",
];

//-------------------------------------------------------------------
// TASKS
//-------------------------------------------------------------------

gulp.task("styles", function() {
    gulp.src(app + "/" + styles + "/**/*.scss")
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on("error", plugins.sass.logError))
        .pipe(plugins.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(dev + "/" + styles))
        .pipe(browserSync.stream())
        .pipe(plugins.size({
            title: "styles",
        }));
});

gulp.task("scripts", function() {
    return gulp.src(app + "/" + scripts + "/**/*.js")
        .pipe(plugins.plumber())
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failAfterError());
});

gulp.task("templates", function() {
    var YOUR_LOCALS = {};
    return gulp.src([app + "/" + template + "/**/*.jade", "!" + app + "/" + template + "/**/_*.jade"])
        .pipe(plugins.plumber())
        .pipe(plugins.jade({
            locals: YOUR_LOCALS,
            pretty: true,
            basedir: app + "/" + template
        }))
        .pipe(gulp.dest(dev + "/"))
        .pipe(plugins.size({
            title: "template"
        }));
});

gulp.task("images", function() {
    return gulp.src(app + "/" + images + "/**/*")
        .pipe(plugins.plumber())
        .pipe(plugins.cache(plugins.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(prod + "/" + images))
        .pipe(plugins.size());
});

gulp.task("html", function() {
    var assets = plugins.useref.assets({
        searchPath: "{" + dev + "," + app + "}"
    });
    return gulp.src([dev + "/**/*.html"])
        .pipe(plugins.plumber())
        .pipe(assets)
        .pipe(plugins.if("*.js", plugins.uglify()))
        .pipe(plugins.if("*.css", plugins.csso()))
        .pipe(assets.restore())
        .pipe(plugins.useref())
        .pipe(plugins.if("*.html", plugins.minifyHtml()))
        .pipe(gulp.dest(prod + "/"))
        .pipe(plugins.size({
            title: "html"
        }));
});

//-------------------------------------------------------------------
// WATCH
//-------------------------------------------------------------------


gulp.task("clean:dev", del.bind(null, [dev]));
gulp.task("serve:dev", function() {

    browserSync({
        //tunnel: "frontendler",
        logConnections: true,
        logFileChanges: true,
        logPrefix: "Frontendler",
        server: {
            baseDir: [dev, app]
        }
    });

    gulp.watch([app + "/" + template + "/**/*.jade"], ["templates", browserSync.reload]);
    gulp.watch([app + "/" + scripts + "/**/*.js"], ["scripts", browserSync.reload]);
    gulp.watch([app + "/" + styles + "/**/*.scss"], ["styles"]);
    gulp.watch([app + "/" + fonts + "**/*"], ["fonts", browserSync.reload]);
    gulp.watch([app + "/" + images + "/**/*"], browserSync.reload);

});

gulp.task("watch", ["clean:dev"], function(cb) {
    runSequence(["styles", "templates"], "serve:dev", cb);
});

//-------------------------------------------------------------------
// BUILD
//-------------------------------------------------------------------

gulp.task("clean:prod", del.bind(null, [prod]));
gulp.task("copy:prod", function() {
    gulp.src([app + "/" + fonts + "/**/*.{eot,svg,ttf,woff}"])
        .pipe(gulp.dest(prod + "/" + fonts));
    gulp.src([app + "/*.*", "node_modules/apache-server-configs/dist/.htaccess"], {
            dot: true
        })
        .pipe(gulp.dest(prod));
});

gulp.task("build", ["clean:prod"], function(cb) {
    runSequence(["styles", "scripts", "templates", "images", "copy:prod"], "html", cb);
});


// Update `url` below to the public URL for your site
gulp.task("pagespeed", function() {
    pagespeed("frontendler.com.br", function(err, data) {
        console.log(data);
    });
});
