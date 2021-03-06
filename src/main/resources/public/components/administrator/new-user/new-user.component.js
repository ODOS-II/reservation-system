(function() {
  'use strict';

  // Register 'newUser' component, along with its associated controller and template
  angular.
  module('newUser').
  component('newUser', {
    templateUrl: 'components/administrator/new-user/new-user.template.html',
    controller: ['userService', '$scope', '$location', NewUserController],
    controllerAs: 'newUser'
  });

  function NewUserController(userService, $scope, $location) {

    $scope.user = {};

    $scope.create = function() {
      userService.create($scope.user, function(response, error) {
        if(response) {
          $location.path('/users/');
        } else if(error) {
          alert();
        }
      });
    }

    $scope.cancel = function() {
      $location.path('/users/');
    }
  }

})();