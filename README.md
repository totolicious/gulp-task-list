[gulp](http://gulpjs.com)-task-list
==============

gulp-task-list is a [gulp](http://gulpjs.com) task that lists all tasks in gulpfile.js along with their comments.


gulpfile.js
-----------

```javascript

    var gulp = require('gulp');

    require('gulp-task-list')(gulp);

    // this task is a dummy task
    gulp.task('some-task', function() {
        console.log('this is some-task');
    });

    // now, this one is the second dummy task
    gulp.task('the-second-task', ['some-task'], function() {
        console.log('uuuu, a second task :)');
    });
```
command line
------------

    $ gulp task-list

    Task name         Description                                         Dependencies
    some-task         this task is a dummy task
    the-secont-task   now, this one is the second dummy task              some-task


Ignore a task to be displayed
-----------------------------

```javascript

    var gulp = require('gulp');

    require('gulp-task-list')(gulp, ['private-task']);

    // this task is a dummy task
    gulp.task('some-task', function() {
        console.log('this is some-task');
    });

    // this is a private task
    gulp.task('private-task', function() {
        console.log('This task is private');
    });
```


Explicitly describe files to be crawled for documentation
-----------------------------

```javascript

    var gulp = require('gulp');

    // array of files to be used for gulp tasks
    var files = [
        __filename,
        'tests/gulp-tasks.js',
        'gulp-tasks/prod.js',
        'gulp-tasks/dev.js',
        'gulp-tasks/infra.js',
        'gulp-tasks/common.js'
    ];

    require('gulp-task-list')(gulp, null, files);
```

command line
------------

    $ gulp task-list

    Task name         Description                                         Dependencies
    some-task         this task is a dummy task
