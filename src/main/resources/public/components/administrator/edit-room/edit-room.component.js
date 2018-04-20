(function() {
  'use strict';

  // Register 'newUser' component, along with its associated controller and template
  angular.
  module('editRoom').
  component('editRoom', {
    templateUrl: 'components/administrator/edit-room/edit-room.template.html',
<<<<<<< HEAD
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
=======
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
	        roomService.getEquipment($routeParams.id, function(res, err) {
	        	if(res) {
	        		$scope.selectedEquipment = response.data;
	    	        $scope.getAvList();
	        	} else if(err) {
	        		alert("Error getting selected equipment!");
	        		$location.path("/rooms/")
	        	}
	        });
	        
	      } else if(error) {
	        alert('Error getting user! ');
	        $location.path('/rooms/');
	      }
      }); 
>>>>>>> 7ca309018e0b3bb029f4e18c545ece4e604658eb
    } else {
      alert('No id specified!');
      $location.path('/rooms/');
    }

<<<<<<< HEAD
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
=======
    $scope.create = function() {
      roomService.create($scope.room, function(response, error) {
        if(response) {
          $location.path('/rooms/');
        } else if(error) {
          alert();
        }
      });
    };

    $scope.cancel = function() {
      $location.path('/rooms/');
    };
    
    $scope.getAvList = function(){
        equipmentService.readAll(function(res, error) {
          if(res) {
            $scope.equipment = res;
          } else if(error) {
            $scope.error = true;
          }
        });
    };
>>>>>>> 7ca309018e0b3bb029f4e18c545ece4e604658eb
  }

})();