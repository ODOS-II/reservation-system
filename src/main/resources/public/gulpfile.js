var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var fs = require('fs');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        online: true,
        middleware: [
            {
                route: "/rooms/",
                handle: function (req, res, next) {
                    if (req.url.match(/reservations/)) {
                        var roomNumber = req.url.replace(/\/rooms\/([0-9]+)\/reservations\//, "$1");
                        var reservations = fs.readFileSync('./mock-data/reservations/room-'+roomNumber+'.json');
                        res.setHeader("Content-Type", "applications/json");
                        res.end(reservations);
                    } else {
                        var rooms = fs.readFileSync('./mock-data/rooms.json');
                        res.setHeader("Content-Type", "applications/json");
                        res.end(wrapToFunkyEmbedded('rooms',rooms));
                    }

                }
            }
        ]
    });
    gulp.watch(["app.*", "index.html", "components", "mock-data"]).on("change", reload);
});

function wrapToFunkyEmbedded(qualifier, dataStr) {
    var data = JSON.parse(dataStr);
    var wrap = { _embedded : {}};
    wrap._embedded[qualifier] = data;
    return JSON.stringify(wrap);

}
gulp.task('default', ['browser-sync']);