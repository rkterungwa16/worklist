import gulp from 'gulp';
import babel from 'gulp-babel';
import jasmineNode from 'gulp-jasmine-node';
import exit from 'gulp-exit';
import istanbul from 'gulp-babel-istanbul';
import injectModules from 'gulp-inject-modules';
import coveralls from 'gulp-coveralls';

// Test coverage
gulp.task('test', () => {
  gulp.src(['./server/models/*js', './server/controllers/*js', './server/routes/*js', './server/models/*js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src(['./server/tests/spec/integration-tests/*Spec.js', './server/tests/spec/unit-tests/*Spec.js'])
        .pipe(babel())
        .pipe(injectModules())
        .pipe(jasmineNode())
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 70 } }))
        .on('end', () => {
          gulp.src('coverage/lcov.info')
            .pipe(coveralls());
        })
        .pipe(exit());
    });
});
