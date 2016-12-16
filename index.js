'use strict';

// use just like fs
var fs = require('graceful-fs'),
    gutil = require('gulp-util'),
    clitable = require('cli-table');

module.exports = function(gulp, ignoreTasks, files) {
    if (Object.prototype.toString.call(ignoreTasks) !== '[object Array]') {
      ignoreTasks = [];
    }
    gulp.task('task-list', function() {
        var gulpfileCode = (files && files.length > 0) ? getCodeFromFiles(files) : fs.readFileSync('gulpfile.js').toString();
        var table = new clitable({
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
            deps;

        for (taskName in gulp.tasks) {
            if (-1 !== ignoreTasks.indexOf(taskName)) {
              continue;
            }
            if (gulp.tasks.hasOwnProperty(taskName)) {
                start = gulpfileCode.lastIndexOf("//", gulpfileCode.indexOf(gulp.tasks[taskName].fn.toString()));
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

function getCodeFromFiles(files) {
    var codes = [];
    files.forEach(function(file) {
        codes.push(fs.readFileSync(file).toString());
    });
    return codes.join('\n');
}
