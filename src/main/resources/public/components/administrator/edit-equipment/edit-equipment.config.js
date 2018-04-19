(function() {
  'use strict';

  angular.
  module('editEquipment').
  config(angularConfig);

  angularConfig.$inject = ['$locationProvider', '$routeProvider'];
  // Angular Routing for /home, and redirect of if not specified
  function angularConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    // Route for template render
    $routeProvider.when('/equipment/edit/:id', {
      template: '<edit-equipment></edit-equipment>'
    })
    .otherwise({ redirectTo: '/' });
  }
})();