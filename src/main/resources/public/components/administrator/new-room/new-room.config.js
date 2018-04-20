(function() {
  'use strict';

  angular.
  module('newRoom').
  config(angularConfig);

  angularConfig.$inject = ['$locationProvider', '$routeProvider'];
  // Angular Routing for /home, and redirect of if not specified
  function angularConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    // Route for template render
    $routeProvider.when('/rooms/create', {
      template: '<new-room></new-room>'
    })
    .otherwise({ redirectTo: '/' });
  }
})();