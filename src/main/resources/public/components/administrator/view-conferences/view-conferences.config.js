(function() {
  'use strict';

  angular.
  module('viewConferences').
  config(angularConfig);

  angularConfig.$inject = ['$locationProvider', '$routeProvider'];
  // Angular Routing for /home, and redirect of if not specified
  function angularConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    // Route for template render
    $routeProvider.when('/conferences/', {
      template: '<view-conferences></view-conferences>'
    })
    .otherwise({ redirectTo: '/' });
  }
})();