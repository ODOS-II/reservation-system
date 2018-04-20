(function() {
  'use strict';

  angular.
  module('viewRooms').
  config(angularConfig);

  angularConfig.$inject = ['$locationProvider', '$routeProvider'];
  // Angular Routing for /home, and redirect of if not specified
  function angularConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    // Route for template render
    $routeProvider.when('/rooms/', {
      template: '<view-rooms></view-rooms>'
    })
    .otherwise({ redirectTo: '/' });
  }
})();