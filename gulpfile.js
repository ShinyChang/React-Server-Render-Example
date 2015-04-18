var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var es = require('event-stream');
var glob = require("glob");
var rename = require("gulp-rename");
var buffer = require('vinyl-buffer');

gulp.task('browserify', function() {
    return glob('./apps/*.js', function(err, files) {
        var tasks = files.map(function(entry) {
            var bundler = browserify({
                entries: [entry],
                transform: [reactify], // We want to convert JSX to normal javascript
                debug: false, // Gives us sourcemapping if true
                cache: {},
                packageCache: {},
                // fullPaths: true // Requirement of watchify
            });
            var watcher = watchify(bundler);
            return watcher
                .on('update', function(err) { // When any files update
                    watcher.bundle() // Create new bundle that uses the cache for high performance
                        .pipe(source(entry))
                        .pipe(buffer())
                        .pipe(uglify())
                        .pipe(gulp.dest('public/build/'));
                })
                .bundle() // Create the initial bundle when starting the task
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(uglify())
                .pipe(gulp.dest('public/build/'));
        });
        return es.merge.apply(null, tasks);
    });
});

gulp.task('css', function() {
    gulp.watch('public/css/**/*.css', function() {
        return gulp.src('public/css/**/*.css')
            .pipe(minifyCSS())
            .pipe(concat('main.css'))
            .pipe(gulp.dest('public/build/'));
    });
});

gulp.task('default', ['browserify', 'css']);
