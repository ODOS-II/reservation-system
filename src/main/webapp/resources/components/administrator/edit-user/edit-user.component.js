(function() {
  'use strict';

  // Register 'newUser' component, along with its associated controller and template
  angular.
  module('editUser').
  component('editUser', {
    templateUrl: 'components/administrator/edit-user/edit-user.template.html',
    controller: ['userService', '$scope, $location', '$routeParam', EditUserController],
    controllerAs: 'editUser'
  });

  function EditUserController(userService, $scope, $location, $routeParam) {

    $scope.user = {};
    if($routeParam.id) {
      userService.read($routeParam.id , function(response, error) {
      if(response) {
        $scope.user = response.body;
      } else if(error) {
        alert('Error getting user! ');
        $location.path('/users/');
      }
    }); 
    } else {
      alert('No id specified!');
      $location.path('/users/');
    }

    $scope.update = function(user) {
      userService.update(user, function(response, error) {
        if(response) {
          $location.path('/users/');
        } else if(error) {
          alert(error.body);
        }
      });
    }

    $scope.cancel = function() {
      $location.path('/users/');
    }
  }

})();