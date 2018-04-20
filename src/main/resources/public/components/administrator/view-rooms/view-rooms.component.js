(function() {
  'use strict';

  // Register 'newUser' component, along with its associated controller and template
  angular.
  module('viewRooms').
  component('viewRooms', {
    templateUrl: 'components/administrator/view-rooms/view-rooms.template.html',
    controller: ['roomService', '$scope', '$location', ViewRoomsController],
    controllerAs: 'viewRooms'
  });

  function ViewRoomsController(roomService, $scope, $location) {

    $scope.rooms = [];
    $scope.error = false;

    roomService.readAll(function(res, error) {
      if(res) {
        $scope.rooms = res;
      } else if(error) {
        $scope.error = true;
      }
    });

    $scope.edit = function(i) {
    	var index = $scope.rooms[i]._links.self.href.lastIndexOf('/');
    	var id = $scope.rooms[i]._links.self.href.substring(index +1);
      $location.path('/rooms/edit/' + id);
    }

    $scope.delete = function(i) {
      roomService.delete($scope.rooms[i]._links.self.href, function(response, error) {
        if(response) {
           $scope.rooms.splice(i, 1);
        } else if(error) {
          console.log(error);
          alert('There was an error deleting user. Please check console log for more information.');
        }
      })
    }
  }


})();