(function() {
  'use strict';

  angular.
  module('editUser').
  config(angularConfig);

  angularConfig.$inject = ['$locationProvider', '$routeProvider'];
  // Angular Routing for /home, and redirect of if not specified
  function angularConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    // Route for template render
    $routeProvider.when('/users/edit/:id', {
      template: '<edit-user></edit-user>'
    })
    .otherwise({ redirectTo: '/' });
  }
})();