(function() {
  'use strict';

  angular.
  module('viewReservation').
  config(angularConfig);

  angularConfig.$inject = ['$locationProvider', '$routeProvider'];
  // Angular Routing for /home, and redirect of if not specified
  function angularConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    // Route for template render
    $routeProvider.when('/reservation/:id', {
      template: '<view-reservation></view-reservation>'
    })
    .otherwise({ redirectTo: '/' });
  }
})();