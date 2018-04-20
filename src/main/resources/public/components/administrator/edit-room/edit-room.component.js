(function() {
  'use strict';

  // Register 'newUser' component, along with its associated controller and template
  angular.
  module('editRoom').
  component('editRoom', {
    templateUrl: 'components/administrator/edit-room/edit-room.template.html',
    controller: ['roomService', '$scope', '$location', '$routeParams', EditRoomController],
    controllerAs: 'editRoom'
  });

  function EditRoomController(roomService, $scope, $location, $routeParams) {

    $scope.room = {};
    if($routeParams.id) {
      roomService.read($routeParams.id , function(response, error) {
      if(response) {
    	  console.log(response.data);
        $scope.room = response.data;
        $scope.room.buildingId = String($scope.room.buildingId);
      } else if(error) {
        alert('Error getting user! ');
        $location.path('/rooms/');
      }
    }); 
    } else {
      alert('No id specified!');
      $location.path('/rooms/');
    }

    $scope.update = function(user) {
      roomService.update(user, function(response, error) {
        if(response) {
          $location.path('/rooms/');
        } else if(error) {
          alert(error);
        }
      });
    }

    $scope.cancel = function() {
      $location.path('/rooms/');
    }
  }

})();