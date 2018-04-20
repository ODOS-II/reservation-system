(function() {
  'use strict';

  // Register 'newUser' component, along with its associated controller and template
  angular.
  module('editRoom').
  component('editRoom', {
    templateUrl: 'components/administrator/edit-room/edit-room.template.html',
    controller: ['roomService', 'equipmentService', '$scope', '$location', '$routeParams', EditRoomController],
    controllerAs: 'editRoom'
  });

  function EditRoomController(roomService, equipmentService, $scope, $location, $routeParams) {

    $scope.room = {occupancy: "10"};
    
    $scope.equipment = [];
    
    $scope.selectedEquipment = [];
    
    if($routeParams.id) {
  
      roomService.read($routeParams.id , function(response, error) {
	      if(response) {
	        $scope.room = response.data;
	        $scope.getAvList();
//	        roomService.getEquipment($routeParams.id, function(res, err) {
//	        	if(res) {
//	        		$scope.selectedEquipment = response.data;
//	    	        $scope.getAvList();
//	        	} else if(err) {
//	        		alert("Error getting selected equipment!");
//	        		$location.path("/rooms/")
//	        	}
//	        });
	        
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

    $scope.getAvList = function(){
        equipmentService.readAll(function(res, error) {
          if(res) {
            $scope.equipment = res;
          } else if(error) {
            $scope.error = true;
          }
        });
    };
  }

})();