(function () {
  'use strict';

  // Register 'requestConference' component, along with its associated controller and template
  angular.
    module('requestConference').
    component('requestConference', {
      templateUrl: 'components/requestor/request-conference/request-conference.template.html',
      controller: ['$window', 'reservationService', RequestConferenceController],
      controllerAs: 'requestConf',
    });

  // Controller - data binds to view-home template
  function RequestConferenceController($window, reservationService) {
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

    function loadMockRooms() {
      if (self.buildingPref == "1") {
        self.rooms = [
          {
            "id": 32,
            "buildingId": 1,
            "name": "Zen Garden",
            "occupancy": 5
          },
          {
            "id": 33,
            "buildingId": 1,
            "name": "Lunch room",
            "occupancy": 5
          }
        ];
      } else if (self.buildingPref == "2") {
        self.rooms = [];
      }
      else if (self.buildingPref == "3") {
        self.rooms = [
          {
            "id": 34,
            "buildingId": 3,
            "name": "Conference room",
            "occupancy": 5
          }
        ];
      }
    }

    reservationService.getRooms(function (success) {
      //console.log(success);
      if (success == false) { // load mock data if request fails
        loadMockRooms();
      } else {
        self.rooms = success;
      }
    });

    self.reloadRooms = () => {
      reservationService.getRooms(function (success) {
        //console.log(success);
        if (success == false) { // load mock data if request fails
          loadMockRooms();
        } else {
          self.rooms = success;
        }
      });
    }

    self.submit = () => {
      // set post data
      var postData = {
        user: 'testuser',
        email: self.email,
        date: self.date,
        starts: self.starts,
        ends: self.ends,
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

    }
  }
})();