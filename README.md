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
