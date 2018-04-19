(function() {
  'use strict';

  // Define controller for the Conference module
  angular.module('Conference')
    .controller('ConferenceController', ConferenceController);
  function ConferenceController() {
    this.titleName = "Conference Room Reservation System";
  }

})();