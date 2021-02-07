const {src,dest,series,parallel, watch} = require('gulp')
const HTMLMin = require('gulp-htmlmin')

function htmlTask(){
    return src('src/*.html')
    .pipe(HTMLMin(
        {
        collapseWhitespace:true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyElements:true,
        }))
    .pipe(dest('build'))
}

const imgMin=require('gulp-imagemin')
function imgTask(){
    return src('src/pics/*')
    .pipe(imgMin(
        {
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [
                {
                    removeViewBox: true
                }
            ]
        }
    ))
    .pipe(dest('build/assets'))
}


const cssMin = require('gulp-clean-css')
const concat = require('gulp-concat')

function cssTask() {
    return src('src/css/**/*.css')
    .pipe(concat('style.min.css'))
    .pipe(cssMin())
    .pipe(dest('build/css'))
}

const sassMin = require('gulp-sass')
function sassTask() {
    return src(['src/css/**/*.css','src/sass/**/*.scss'])
    .pipe(sassMin())
    .pipe(concat('style.min.css'))
    .pipe(cssMin())
    .pipe(dest('build/css'))
}

const jsMin = require('gulp-terser')

function jsTask(){
    return src('src/js/**/*.js')
    .pipe(concat('script.min.js'))
    .pipe(jsMin())
    .pipe(dest('build/js'))
}

function watchTask(){
    watch(['src/js/**/*.js', "src/css/**/*.css"], { interval: 1000 }, parallel(jsMin,cssTask,sassTask))
}

exports.default = series(parallel(cssTask,sassTask,imgTask,htmlTask,jsTask),watchTask); 



// //sass task
// var sass = require('gulp-sass');
// function sassMinify() {
//     return src(["src/sass/**/*.scss", "src/css/**/*.css"])
//         .pipe(sass()) // Using gulp-sass
//         //concate all js files in all.min.js
//         .pipe(concat('style.sass.min.css'))
//         .pipe(cleanCss())
//         .pipe(gulp.dest('dist/assets/css'))
// }





