'use strict';

// use just like fs
var fs = require('graceful-fs'),
    gutil = require('gulp-util'),
    clitable = require('cli-table');

module.exports = function(gulp) {
    gulp.task('task-list', function() {
        var gulpfileCode = fs.readFileSync('gulpfile.js').toString(),
            table = new clitable({
                head: ['Task name', 'Description', 'Dependencies'],
                chars: {
                    'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': '',
                    'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': '',
                    'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': '',
                    'right': '' , 'right-mid': '' , 'middle': ' '
                }
            }),
            taskName,
            start,
            end,
            comment,
            deps,
            regex,
            fnPos;


        for (taskName in gulp.tasks) {
            if (gulp.tasks.hasOwnProperty(taskName)) {
                if(taskName == 'task-list') continue;

                regex = 'gulp\\.task\\s*\\(\\s*[\\\'"]' + taskName + '[\\\'"]';
                fnPos = gulpfileCode.search(new RegExp(regex));

                if(fnPos == -1) continue;

                start = gulpfileCode.lastIndexOf("//", fnPos);
                end = gulpfileCode.indexOf('\n', start);
                if (start !== -1 && end !== -1) {
                    start += 2;
                    comment = gulpfileCode.substring(start, end);
                } else {
                    comment = "";
                }
                deps = gulp.tasks[taskName].dep.join(", ");

                table.push([taskName, comment, deps]);
            }
        }

        console.log(table.toString());
    });
};
