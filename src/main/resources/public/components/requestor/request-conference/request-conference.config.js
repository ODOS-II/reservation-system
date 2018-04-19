(function() {
  'use strict';

  angular.
  module('requestConference').
  config(angularConfig);

  angularConfig.$inject = ['$locationProvider', '$routeProvider'];
  // Angular Routing for /home, and redirect of if not specified
  function angularConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    // Route for template render
    $routeProvider.when('/conferences/request', {
      template: '<request-conference></request-conference>'
    })
    .otherwise({ redirectTo: '/' });
  }
})();