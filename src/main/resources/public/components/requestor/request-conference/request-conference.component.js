(function () {
    'use strict';

    // Register 'requestConference' component, along with its associated controller and template
    angular.module('requestConference').component('requestConference', {
        templateUrl: 'components/requestor/request-conference/request-conference.template.html',
        controller: ['$window', 'reservationService', 'AllowedMinBookingRequestTimeHours',RequestConferenceController],
        controllerAs: 'requestConf',
    });

    // Controller - data binds to view-home template
    function RequestConferenceController($window, reservationService, AllowedMinBookingRequestTimeHours) {
        var self = this;

        self.isDisabled = () => {
            //if(self.starts < self.ends) return false;
            //else return true;

            /*console.log(self.starts);
            console.log(self.ends);
            console.log(self.starts < self.ends);

            if(self.starts == undefined || self.ends == undefined) {
              console.log("here");
              return false;
            } else {
              console.log("there");
              if(Date.parse('01/01/2011' + self.starts) > Date.parse('01/01/2011' + self.ends)) {
                return true;
              } else {
                return false;
              }
            }*/

            return false;
        }



    reservationService.getRooms(function (success) {
      if(success) {
        var rooms = success.data._embedded.rooms;
        var roomIds = _.map(rooms ,'id');
        reservationService.getReservationsForRooms(roomIds).then( function(allReservations) {
            self.rooms = self.filterOnlyAvailableRooms(rooms, allReservations);
        });

      }
    });

    self.filterOnlyAvailableRooms = (rooms, allReservations) => {
        return rooms.filter(function(room) {
            var reservationsMap = _.find(allReservations, {roomId: room.id});
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
      reservationService.getRooms(function (success) {
        //console.log(success);
        if (success == false) { // load mock data if request fails
          loadMockRooms();
        } else {
          self.rooms = success.data._embedded.rooms;
        }
      });
    }

        self.submit = () => {
            var starts = moment(self.date).set(self.startHour, 'h').set(self.startMin, 'minutes');
            var ends = moment(self.date).set(self.endHour, 'h').set(self.endMin, 'minutes');

            // set post data
            var postData = {
                user: 'testuser',
                email: self.email,
                date: self.date,
                starts: starts,
                ends: ends,
                buildingPref: self.buildingPref,
                room: self.room,
                conferenceTitle: self.conferenceTitle,
                conferenceDetails: self.conferenceDetails,
                invites: self.invites
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