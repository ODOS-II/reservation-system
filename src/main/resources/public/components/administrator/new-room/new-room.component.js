(function() {
  'use strict';

  // Register 'newUser' component, along with its associated controller and template
  angular.
  module('newRoom').
  component('newRoom', {
    templateUrl: 'components/administrator/new-room/new-room.template.html',
    controller: ['roomService', 'equipmentService', '$scope', '$location', NewRoomController],
    controllerAs: 'newRoom'
  });

  function NewRoomController(roomService, equipmentService, $scope, $location) {

    $scope.room = {occupancy: "10"};

    $scope.create = function() {
      roomService.create($scope.room, function(response, error) {
        if(response) {
          $location.path('/rooms/');
        } else if(error) {
          alert();
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
    }
    
    $scope.getAvList();
  }

})();