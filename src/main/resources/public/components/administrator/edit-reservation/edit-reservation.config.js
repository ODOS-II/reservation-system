(function() {
  'use strict';

  angular.
  module('editReservation').
  config(angularConfig);

  angularConfig.$inject = ['$locationProvider', '$routeProvider'];
  // Angular Routing for /home, and redirect of if not specified
  function angularConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    // Route for template render
    $routeProvider.when('/reservations/edit/:id', {
      template: '<edit-reservation></edit-reservation>'
    })
    .otherwise({ redirectTo: '/' });
  }
})();