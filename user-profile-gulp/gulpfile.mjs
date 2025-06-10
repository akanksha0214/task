import gulp from 'gulp';
import sass from 'gulp-sass';
import * as dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import browserSync from 'browser-sync';
import fileinclude from 'gulp-file-include';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';

const sassCompiler = sass(dartSass);
const server = browserSync.create();

// Error handling
const errorHandler = {
    errorHandler: notify.onError({
        title: 'Error running <%= task %>',
        message: '<%= error.message %>'
    })
};

// Paths
const paths = {
    scss: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css'
    },
    html: {
        src: 'src/html/**/*.html',
        dest: 'dist'
    },
    js: {
        src: 'src/js/**/*.js',
        dest: 'dist/js'
    }
};

// SCSS compilation
export function styles() {
    return gulp.src(paths.scss.src)
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init())
        .pipe(sassCompiler().on('error', sassCompiler.logError))
        .pipe(autoprefixer({
            cascade: false,
            grid: true
        }))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(server.stream())
        .pipe(notify({ message: 'Styles task complete' }));
}

// HTML processing
export function html() {
    return gulp.src(['src/html/*.html', '!src/html/partials/**/*.html'])
        .pipe(plumber(errorHandler))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(server.stream())
        .pipe(notify({ message: 'HTML task complete' }));
}

// JavaScript processing
export function scripts() {
    return gulp.src(paths.js.src)
        .pipe(plumber(errorHandler))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(server.stream())
        .pipe(notify({ message: 'Scripts task complete' }));
}

// Watch files
export function watch() {
    server.init({
        server: {
            baseDir: './dist'
        },
        notify: false,
        open: true
    });

    gulp.watch(paths.scss.src, styles);
    gulp.watch('src/html/**/*.html', html);
    gulp.watch(paths.js.src, scripts);
}

// Build task
export const build = gulp.series(gulp.parallel(styles, html, scripts));

// Default task
export default gulp.series(build, watch);
