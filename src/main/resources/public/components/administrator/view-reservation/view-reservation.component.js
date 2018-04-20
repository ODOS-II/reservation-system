(function() {
  'use strict';

  // Register 'newUser' component, along with its associated controller and template
  angular.
  module('viewReservations').
  component('viewReservations', {
    templateUrl: 'components/administrator/view-reservation/view-reservation.template.html',
    controller: ['reservationService', 'userService', '$http', '$scope', '$location', ViewReservationController],
    controllerAs: 'viewReservations'
  });

  function ViewReservationController(reservationService, userService, $http, $scope, $location) {

    $scope.rooms = [];
    $scope.error = false;
    $scope.reservations = [];

    reservationService.readAll(function(res) {
    	if(res) {
    		$scope.reservations = res.data._embedded.reservations;
    		
    		for(var i = 0; i < $scope.reservations.length; i++) {
    			var user = $scope.reservations[i]._links.user.href;
    	    	$scope.getUser(i, user);

    		}
    	} else {
    		alert("couldn't obtain reservations");
    	}
    });
  
    $scope.getUser = function(i, user) {
    	$http({
			method: 'GET',
			url: user
	}).then(function(res) {
		$scope.reservations[i].user = res.data;
		}, function(e) {
			alert(e);
		});
    }
    
    $scope.edit = function(i) {
    	var index = $scope.reservations[i]._links.self.href.lastIndexOf('/');
    	var id = $scope.reservations[i]._links.self.href.substring(index +1);
      $location.path('/reservations/edit/' + id);
    }

    $scope.delete = function(i) {
    	var index = $scope.reservations[i]._links.self.href.lastIndexOf('/');
    	var id = $scope.reservations[i]._links.self.href.substring(index +1);
      reservationService.delete(id, function(response) {
        if(true) {
           $scope.reservations.splice(i, 1);
        } else { alert('error'); }
      })
    }
  }


})();