const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const autoprefix = require('gulp-autoprefixer');
const {parallel} = require('gulp');
const {series} = require('gulp');

const jsPath = './src/js/**/*.js';
const sassPath = './src/sass/main.sass';

function copyHtml(){
    return gulp.src('src/*.html').pipe(gulp.dest('build'));
}


function copyImages(){
    return gulp.src('src/img/**/*').pipe(gulp.dest('build/img'));
}


//compile sass into css
function style(){
    
    return gulp.src(sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: sassPath,
        outputStyle: 'compressed'
    })
    .on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefix('last 4 versions'))
    .pipe(gulp.dest('./build/css')) 
    .pipe(browserSync.stream());
}

function styleDev(){
    
        return gulp.src(sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: sassPath
        })
        .on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css')) 
        .pipe(browserSync.stream());
    }

function js(){
    return gulp.src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

function jsDev(){
    return gulp.src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

function watch(){
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });
    gulp.watch(['./src/sass/**/*.sass', './src/sass/**/*.scss'], styleDev);
    gulp.watch('./src/*html', copyHtml).on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js', jsDev).on('change', browserSync.reload);
    gulp.watch('./src/img/**/*', copyImages).on('change', browserSync.reload);
}

//In case you want to copy source files to build folder

function copySourceStyle(){
    return gulp.src('src/sass/**/*').pipe(gulp.dest('build/srcfiles/sass'));
}

function copySourceJs(){
    return gulp.src('src/js/**/*').pipe(gulp.dest('build/srcfiles/js'));
}

exports.copyHtml = copyHtml;
exports.copyImages = copyImages;
exports.style = style;
exports.styleDev = styleDev;
//copies source sass and js to build/srcfiles folder
exports.copySource = parallel (copySourceStyle, copySourceJs);

exports.build = parallel(copyHtml, copyImages, style, js);
exports.buildWithSourceFiles = parallel(copyHtml, copyImages, copySourceStyle, copySourceJs, style, js);
exports.buildDev = parallel(copyHtml, copyImages, styleDev, jsDev);
exports.default= series(copyHtml, copyImages, styleDev, jsDev, watch); 