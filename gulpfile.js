var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    hash = require("gulp-hash"),
    del = require("del");


// Compile SCSS files to CSS
gulp.task("scss", function () {
    gulp.src("themes/squid/static/sass/**/*.scss")
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(autoprefixer({
            browsers: ["last 20 versions"]
        }))
        .pipe(hash())
        .pipe(gulp.dest("static/css"))
        // Tell Hugo to map the hashed version of the file with the actual file 
        .pipe(hash.manifest("hash.json"))
        .pipe(gulp.dest("data/css"))
});

// Hash images
gulp.task("images", function () {
    del(["themes/squid/static/images/**/*"])
    gulp.src("src/images/**/*")
        .pipe(hash())
        .pipe(gulp.dest("static/images"))
        .pipe(hash.manifest("hash.json"))
        .pipe(gulp.dest("data/images"))
})

// Hash javascript
gulp.task("js", function () {
    del(["themes/squid/static/js/**/*"])
    gulp.src("src/js/**/*")
        .pipe(hash())
        .pipe(gulp.dest("static/js"))
        .pipe(hash.manifest("hash.json"))
        .pipe(gulp.dest("data/js"))
})

// Watch asset folder for changes
gulp.task("watch", ["scss"], function () {
    gulp.watch("themes/squid/static/scss/**/*", ["scss"])
    gulp.watch("themes/squid/static/images/**/*", ["images"])
    gulp.watch("themes/squid/static/js/**/*", ["js"])
});

// Set watch as default task
gulp.task("default", ["watch"])