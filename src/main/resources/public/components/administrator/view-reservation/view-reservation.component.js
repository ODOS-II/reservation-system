(function() {
  'use strict';

  // Register 'newUser' component, along with its associated controller and template
  angular.
  module('viewReservation').
  component('viewReservation', {
    templateUrl: 'components/administrator/view-reservation/view-reservation.template.html',
    controller: ['reservationService', '$scope', '$location', ViewReservationController],
    controllerAs: 'viewReservation'
  });

  function ViewReservationController(reservationService, $scope, $location) {

    $scope.rooms = [];
    $scope.error = false;
    $scope.reservations = [];

    reservationService.getRooms(function(res, error) {
      if(res) {
        $scope.rooms = res;
        reservationService.getReservationsForRooms(createRoomIdArray(), function(res, err) {
        	if(res) {
        		$scope.reservations = res;
        	} else if (err) {
        		$scope.error = true;
        	}
        });
      } else if(error) {
        $scope.error = true;
      }
    });

    createRoomIdArray = function(rooms) {
    	roomIdArray = [];
    	for (var i = 0; i < rooms.length; i++) {
			roomIdArray.push(rooms[i].id);
		}
    	
    	return roomIdArray;
    }
    
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