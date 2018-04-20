(function() {
  'use strict';

  angular.
  module('editRoom').
  config(angularConfig);

  angularConfig.$inject = ['$locationProvider', '$routeProvider'];
  // Angular Routing for /home, and redirect of if not specified
  function angularConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    // Route for template render
    $routeProvider.when('/rooms/edit/:id', {
      template: '<edit-room></edit-room>'
    })
    .otherwise({ redirectTo: '/' });
  }
})();