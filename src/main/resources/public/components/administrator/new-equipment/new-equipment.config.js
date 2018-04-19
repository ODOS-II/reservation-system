(function() {
  'use strict';

  angular.
  module('newEquipment').
  config(angularConfig);

  angularConfig.$inject = ['$locationProvider', '$routeProvider'];
  // Angular Routing for /home, and redirect of if not specified
  function angularConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    // Route for template render
    $routeProvider.when('/equipment/create', {
      template: '<new-equipment></new-equipment>'
    })
    .otherwise({ redirectTo: '/' });
  }
})();