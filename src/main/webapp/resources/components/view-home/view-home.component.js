(function() {
  'use strict';

  // Register 'viewHome' component, along with its associated controller and template
  angular.
  module('viewHome').
  component('viewHome', {
    templateUrl: 'components/view-home/view-home.template.html',
    controller: ['$window', '$scope', '$timeout', 'homeService', HomeController],
    controllerAs: 'home',
  });


  // Controller - data binds to view-home template
  function HomeController($window, $scope, $timeout, homeService) {
    this.newConference = () => {
      $window.location.href = '/#!/conferences/request';
    }

    $scope.date = Date.now();;
    $scope.tickInterval = 1000;

    var tick = function() {
      $scope.date = Date.now();
      $timeout(tick, $scope.tickInterval);
    }

    $scope.rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10];
    $scope.reservations = [{"room":1, "reservation": "1200-1500 Conference Test 1 Smith"}, {"room":1, "reservation": "1600-1615 Conference Test 3 Cross"}, {"room":2, "reservation": "1530-1600 Conference Test 2 Green"}];
  
    $scope.selectedRoom = 1;
    $scope.selectedReservations = [];

    $scope.getReservations = function() {
      $scope.selectedReservations = [];
      for(var i = 0; i < $scope.reservations.length; i++) {
        if($scope.reservations[i].room == $scope.selectedRoom) {
          $scope.selectedReservations.push($scope.reservations[i]);
        }
      }
    }
    $scope.reservationFilter = function(item) {
      return item.room == $scope.selectedRoom;
    }
  }
})();