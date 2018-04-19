(function() {
  'use strict';

  angular.
  module('viewEquipment').
  config(angularConfig);

  angularConfig.$inject = ['$locationProvider', '$routeProvider'];
  // Angular Routing for /home, and redirect of if not specified
  function angularConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    // Route for template render
    $routeProvider.when('/equipment/', {
      template: '<view-equipment></view-equipment>'
    })
    .otherwise({ redirectTo: '/' });
  }
})();