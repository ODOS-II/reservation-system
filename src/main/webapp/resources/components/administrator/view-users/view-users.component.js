(function() {
  'use strict';

  // Register 'newUser' component, along with its associated controller and template
  angular.
  module('viewUsers').
  component('viewUsers', {
    templateUrl: 'components/administrator/view-users/view-users.template.html',
    controller: ['userService', '$scope', '$location', ViewUsersController],
    controllerAs: 'viewUsers'
  });

  function ViewUsersController(userService, $scope, $location) {

    $scope.users = [];
    $scope.error = false;

    userService.readAll(function(res, error) {
      if(res) {
        $scope.users = res.body;
      } else if(error) {
        $scope.error = true;
      }
    });

    $scope.edit = function(i) {
      $location.path('/users/edit/' + $scope.users[i]);
    }

    $scope.delete = function(i) {
      userService.delete(id, function(response, error) {
        if(response) {
           $scope.users.splice(i, 1);
        } else if(error) {
          console.log(error);
          alert('There was an error deleting user. Please check console log for more information.');
        }
      })
    }
  }


})();