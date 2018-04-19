(function() {
  'use strict';

  angular.
  module('viewLogin').
  config(angularConfig);

  angularConfig.$inject = ['$locationProvider', '$routeProvider'];
  // Angular Routing for /login, and redirect of if not specified
  function angularConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    // Route for template render
    $routeProvider.when('/', {
      template: '<view-login></view-login>'
    })
    .otherwise({ redirectTo: '/' });
  }
})();