(function() {
  'use strict';

  // Conference
  // modues used are injected here
  angular.module('Conference', [
    'ngRoute',
    'viewHome',
    'requestConference',
    
    'viewUsers',
    'newUser',
    'editUser',

    'viewEquipment',
    'newEquipment',
    'editEquipment',

    'viewConferences'

  ]);
})();