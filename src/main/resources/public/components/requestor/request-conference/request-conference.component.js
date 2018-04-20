(function () {
    'use strict';

    // Register 'requestConference' component, along with its associated controller and template
    angular.module('requestConference').component('requestConference', {
        templateUrl: 'components/requestor/request-conference/request-conference.template.html',
        controller: ['$window', 'reservationService', 'userService', 'AllowedMinBookingRequestTimeHours',RequestConferenceController],
        controllerAs: 'requestConf',
    });

    // Controller - data binds to view-home template
    function RequestConferenceController($window, reservationService, userService, AllowedMinBookingRequestTimeHours) {
        var self = this;
       
        self.findUsers = function() {
	        	userService.readAll(function(res, err) {
	        	if(res) {
	        		self.users = res;
	        	}
	        });
        }
        
        self.findUsers();

        self.findRooms = function() {
            reservationService.getRooms(function (success) {
                if(success) {
                    var rooms = success.data._embedded.rooms;
                    self.rooms = rooms;
//                    var roomIds = _.map(rooms ,'id');
//                    reservationService.getReservationsForRooms(roomIds).then( function(allReservations) {
//                        self.rooms = self.filterOnlyAvailableRooms(rooms, allReservations);
//                    });

                }
            });
        }

        self.findRooms();

        self.filterOnlyAvailableRooms = (rooms, allReservations) => {
        return rooms.filter(function(room) {
        	var index = room._links.self.href.lastIndexOf('/');
        	var id = room._links.self.href.substring(index +1);
            var reservationsMap = _.find(allReservations, {roomId: id});
            console.log(reservationMap);
            if (!reservationsMap || !reservationsMap.reservations) return true;
            var found =  _.find(reservationsMap.reservations, function(reservation) {
                var alreadyReserved =  self.alreadyReservedForCurrentSlot(reservation);
                return alreadyReserved;
            });
            return !found;
        })
    };

    self.alreadyReservedForCurrentSlot = function(reservation) {
        var starts = moment(self.date).set(self.startHour, 'h').set(self.startMin, 'minutes');
        var ends = moment(self.date).set(self.endHour, 'h').set(self.endMin, 'minutes');

        var resStarts = moment(reservation.startTime);
        var resEnds = moment(reservation.endTime);

        if (starts.isBetween(resStarts, resEnds)) {
            return true;
        }
        if (ends.isBetween(resStarts, resEnds)) {
            return true;
        }
        return false;
    };

    self.reloadRooms = () => {
      self.findRooms();
    }

        self.submit = () => {
            var starts = moment(self.date).set(self.startHour, 'h').set(self.startMin, 'minutes');
            starts.set({hour: self.startHour, minute: self.startMin, second: 0, millisecond: 0});
            var ends = moment(self.date).set(self.endHour, 'h').set(self.endMin, 'minutes');
            ends.set({hour: self.endHour, minute: self.endMin, second:0, millisecond: 0});
            // set post data
            var postData = {
                user: self.user,
                startTime: starts,
                endTime: ends,
                room: self.room,
                title: self.conferenceTitle,
                roomConfiguration: "MEETING"
            };

      // create reservation
      reservationService.create(self.room, postData, function (success) {
        // usually rebind to DOM here, but in this case, redirect back to home, which pulls calender data
        console.log("reservation using room: " + self.room);
        console.log(postData);
        $window.location.href = '/#!/home';
      });

        };

        self.getDateValidationMessage = (hour, min) => {
            if (hour && hour.$invalid && min &&  min.$invalid) return 'Please enter valid hour and minutes.';
            if (hour && hour.$invalid) return 'Please enter valid hour.';
            if (min && min.$invalid) return 'Please enter valid minutes.';
            return '';
        };


        self.confRequestWindowValidation = (startHr, startMin, startAmPm,  endHour, endMin, endAmPm) => {
            var start = momentFromHrMin(startHr, startMin, startAmPm);
            var end = momentFromHrMin(endHour, endMin, endAmPm);
            var duration = moment.duration(end.diff(start));
            var minutes = parseInt(duration.asMinutes());
            if (minutes > AllowedMinBookingRequestTimeHours * 60 ) return 'Conference request time exceeds minimum allowed 3 hours';
            return '';
        };

        self.init = function () {
            var starts = moment();
            var ends  = moment();
            self.startHour = Number.parseInt(starts.format('h'));
            self.endHour = Number.parseInt(ends.format('h'));
            self.endMin = self.startMin =  0;
            self.startAmPm = starts.format('A');
            self.endAmPm = ends.format('A');
            self.date = new Date();
        };
        self.init();
    }

    function momentFromHrMin( hr, min, amPm) {
        var aMoment = moment();
        if (angular.isDefined(hr) && angular.isDefined(min)) {
            // aMoment.set(amPm && amPm === 'PM'? 12+hr : hr, 'h');
            // aMoment.set(min, 'minutes');
            aMoment.hour(amPm && amPm === 'PM'? 12+hr : hr);
            aMoment.minutes(min);
        }

        return aMoment;

    }
})();