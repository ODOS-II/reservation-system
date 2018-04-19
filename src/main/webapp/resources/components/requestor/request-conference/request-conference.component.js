(function () {
  'use strict';

  // Register 'requestConference' component, along with its associated controller and template
  angular.
    module('requestConference').
    component('requestConference', {
      templateUrl: 'components/requestor/request-conference/request-conference.template.html',
      controller: ['$window', 'requestConferenceService', RequestConferenceController],
      controllerAs: 'requestConf',
    });

  // Controller - data binds to view-home template
  function RequestConferenceController($window, requestConferenceService) {
    this.test = "hello";

    this.submit = () => {
      // set post data
      var postData = {
        email: this.email,
        date: this.date,
        starts: this.starts,
        ends: this.ends,
        buildingPref: this.buildingPref,
        conferenceTitle: this.conferenceTitle,
        conferenceDetails: this.conferenceDetails,
        invites: this.invites
      };
      // create conference
      requestConferenceService.createConference(postData, function (success) {
        // usually rebind to DOM here, but in this case, redirect back to home, which pulls calender data
        $window.location.href = '/#!/home';
      });
    }
  }
})();