var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var fs = require('fs');

// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        online: true,
        middleware: [
            {
                route: "/rooms/",
                handle: function (req, res, next) {
                    var rooms = fs.readFileSync('./mock-data/rooms.json');
                    res.setHeader("Content-Type", "applications/json");
                    res.end(wrapToFunkyEmbedded('rooms', rooms));
                }
            },
            { route: "/rooms/1/reservations/", handle: getReservation(1)},
            { route: "/rooms/2/reservations/", handle: getReservation(2)},
            { route: "/rooms/3/reservations/", handle: getReservation(3)},
            { route: "/rooms/4/reservations/", handle: getReservation(4)},

        ]
    });
    gulp.watch(["app.*", "index.html", "components", "mock-data"]).on("change", reload);
});

function getReservation(roomNumber) {
    return function(req, res, next) {
        var file = './mock-data/reservations/room-' + roomNumber + '.json';
        if (fs.existsSync(file)) {
            var reservations = fs.readFileSync(file);
            res.setHeader("Content-Type", "applications/json");
            res.end(reservations);
        } else {
            res.statusCode  = 404;
            res.end();
        }
    }
}

function wrapToFunkyEmbedded(qualifier, dataStr) {
    var data = JSON.parse(dataStr);
    var wrap = {_embedded: {}};
    wrap._embedded[qualifier] = data;
    return JSON.stringify(wrap);

}

gulp.task('default', ['browser-sync']);