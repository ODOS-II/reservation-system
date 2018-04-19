(function() {
  'use strict';

  angular.
  module('viewUsers').
  config(angularConfig);

  angularConfig.$inject = ['$locationProvider', '$routeProvider'];
  // Angular Routing for /home, and redirect of if not specified
  function angularConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    // Route for template render
    $routeProvider.when('/users/', {
      template: '<view-users></view-users>'
    })
    .otherwise({ redirectTo: '/' });
  }
})();