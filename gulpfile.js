var gulp = require('gulp');

// VARIABLES /////////////////////////////////////////
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var cssGlobbing = require('gulp-css-globbing');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
// var postcss = require('gulp-postcss');

var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); // $ npm i -D imagemin-pngquant
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var webp = require('gulp-webp');

// run jekyll
var gutil = require('gulp-util');
var run          = require('gulp-run');

var path = require('path');
// tools
var browserSync = require('browser-sync').create();
var del = require('del');
var notify = require('gulp-notify');



// VARIABLES /////////////////////////////////////////
var rootPath = '';

var paths = {
    //specifying path like this ensures that linter will notify you of suspicious rules from all scss files
    styles: [
        rootPath + 'frontend-src/scss/**/*.scss',
        rootPath + 'frontend-src/scss/*.scss'
    ],
    scripts: [
        rootPath + 'frontend-src/js/**/*.js',
    ],
    scriptsLibraries: [
        rootPath + 'frontend-src/js/libs/*.js'
    ],
    scriptsModules: [
        rootPath + 'frontend-src/js/modules/*.js',
    ],
    images: [
        rootPath + 'frontend-src/img/**/*'
    ],
    svgSprites: [
        rootPath + 'frontend-src/img/svg/*.svg'
    ],
    sourceAssets: [
        rootPath + '_source-assets/**/*'
    ],
    dest: rootPath + 'frontend-dist'
};



// VARIABLES /////////////////////////////////////////

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

var autoprefixerOptions = {
    browsers: ['last 4 versions', '> 1%']
};






// TASKS /////////////////////////////////////////

gulp.task('sass', function() {
    return gulp.src(paths.styles)
        .pipe(plumber())
        .pipe(cssGlobbing({
            extensions: ['.scss'],
            autoReplaceBlock: {
                onOff: true,
                globBlockBegin: 'cssGlobbingBegin',
                globBlockEnd: 'cssGlobbingEnd',
                globBlockContents: 'modules/*.scss'
            },
            scssImportPath: {
                leading_underscore: false,
                filename_extension: false
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', notify.onError(function (error) {
            return 'Problem file : ' + error.message;
        })))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream());
});

gulp.task('sass-prod', function() {
    return gulp.src(paths.styles)
        .pipe(plumber())
        .pipe(cssGlobbing({
            extensions: ['.scss'],
            autoReplaceBlock: {
                onOff: true,
                globBlockBegin: 'cssGlobbingBegin',
                globBlockEnd: 'cssGlobbingEnd',
                globBlockContents: 'modules/*.scss'
            },
            scssImportPath: {
                leading_underscore: false,
                filename_extension: false
            }
        }))
        .pipe(sass().on('error', notify.onError(function (error) {
            return 'Problem file : ' + error.message;
        })))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(cssnano({outputStyle: 'compressed'}))
        .pipe(gulp.dest(paths.dest))
});





gulp.task('scripts', function() {
    return gulp.src(paths.scriptsModules)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('generatedByGulp.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest + '/js'))
});

gulp.task('scripts-prod', function() {
    return gulp.src(paths.scriptsModules)
        .pipe(plumber())
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('generatedByGulp.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest + '/js'));
});

gulp.task('scripts-libraries', function() {
    return gulp.src(paths.scriptsLibraries)
    .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest + '/js/libs'))
});

gulp.task('scripts-libraries-prod', function() {
    return gulp.src(paths.scriptsLibraries)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest + '/js/libs'))
});





gulp.task('images', function(){
    return gulp.src(paths.images)
        .pipe(plumber())
        .pipe(imageminJpegRecompress({
            loops: 3,
            min: 70,
            max: 75,
            progressive: true
        })())
        .pipe(imagemin({
            optimizationLevel: 3, // png
            progressive: true, // jpg
            interlaces: true, // gif
            svgoPlugins: [{removeViewBox: false}], // svg
            use: [pngquant()] // png
        }))
        .pipe(gulp.dest(paths.dest + '/img'));
});

// This task optimizes contents of _source-assets folder. There I can mirror folder structure of desired output.
gulp.task('postImages', function(){
    return gulp.src(paths.sourceAssets)
        .pipe(plumber())
        .pipe(imageminJpegRecompress({
            loops: 3,
            min: 70,
            max: 75,
            progressive: true
        })())
        .pipe(imagemin({
            optimizationLevel: 3, // png
            progressive: true, // jpg
            interlaces: true, // gif
            svgoPlugins: [{removeViewBox: false}], // svg
            use: [pngquant()] // png
        }))
        .pipe(gulp.dest(rootPath));
});

gulp.task('images2webp', function () {
    return gulp.src(paths.images)
        .pipe(webp({
            quality: 75,
            sns: 75
        }))
        .pipe(gulp.dest(paths.dest + '/img'));
});

gulp.task('svgstore', function() {
    return gulp.src(paths.svgSprites)
        .pipe(plumber())
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-ico',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore())
        .pipe(gulp.dest(paths.dest + '/img/svg-sprite'));
});

var config = {
  drafts: !!gutil.env.drafts      // pass --drafts flag to serve drafts
};

// Runs Jekyll build
gulp.task('build:jekyll', function() {
  var shellCommand = 'bundle exec jekyll build --config _config.yml,_localhost_config.yml';
  if (config.drafts) { shellCommand += ' --drafts'; };

  return gulp.src(rootPath)
    .pipe(run(shellCommand))
    .on('error', gutil.log);
});

gulp.task('build:jekyll:watch', ['build:jekyll'], function(cb) {
  browserSync.reload();
  cb();
});

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: '_site/',
            ghostMode: false, // do not mirror clicks, reloads, etc. (performance optimization)
            open: false, // do not open the browser (annoying)
            index: 'index.html'
        }
    });
    // browserSync.init({
    //     proxy: "jenahajek.loc"
    // });
    // Watch site settings
    gulp.watch(['_config.yml', '_localhost_config.yml'], ['build:jekyll:watch']);
    gulp.watch(paths.styles, ['sass']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.scripts, ['scripts', 'scripts-libraries']);
    gulp.watch(paths.svgSprites, ['svgstore']);
});





// TASKS shortcuts /////////////////////////////////////////
gulp.task('clean', function() {
    return del([paths.dest])
}); // todo - vycistit i generovane assety pro posty?





gulp.task('default', ['sass', 'scripts', 'scripts-libraries', 'images', 'images2webp', 'postImages', 'svgstore', 'serve']);



gulp.task('build', ['clean', 'prod-task']);

gulp.task('prod-task', ['sass-prod', 'scripts-prod', 'scripts-libraries', 'postImages', 'images', 'images2webp']);
