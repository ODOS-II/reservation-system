(function() {
  'use strict';

  angular.
  module('newUser').
  config(angularConfig);

  angularConfig.$inject = ['$locationProvider', '$routeProvider'];
  // Angular Routing for /home, and redirect of if not specified
  function angularConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    // Route for template render
    $routeProvider.when('/users/create', {
      template: '<new-user></new-user>'
    })
    .otherwise({ redirectTo: '/' });
  }
})();