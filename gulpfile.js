var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', shell.task('node main'));

gulp.task('test', shell.task('npm run test'));

gulp.task('input1', shell.task('node mainfromfile.js inputs/input1.pl'));
gulp.task('input2', shell.task('node mainfromfile.js inputs/input2.pl'));
gulp.task('input3', shell.task('node mainfromfile.js inputs/input3.pl'));
gulp.task('input4', shell.task('node mainfromfile.js inputs/input4.pl'));
gulp.task('input5', shell.task('node mainfromfile.js inputs/input5.pl'));