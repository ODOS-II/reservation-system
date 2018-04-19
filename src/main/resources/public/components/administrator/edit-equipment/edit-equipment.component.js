(function() {
  'use strict';

  // Register 'newUser' component, along with its associated controller and template
  angular.
  module('editEquipment').
  component('editEquipment', {
    templateUrl: 'components/administrator/edit-equipment/edit-equipment.template.html',
    controller: ['equipmentService', '$scope', '$location', '$routeParams', EditEquipmentController],
    controllerAs: 'editEquipment'
  });

  function EditEquipmentController(equipmentService, $scope, $location, $routeParams) {

    $scope.equipment = {};
    if($routeParams.id) {
      equipmentService.read($routeParams.id , function(response, error) {
      if(response) {
        $scope.equipment = response;
      } else if(error) {
        alert('Error getting user! ');
        $location.path('/equipment/');
      }
    }); 
    } else {
      alert('No id specified!');
      $location.path('/equipment/');
    }

    $scope.update = function(user) {
      equipmentService.update(user, function(response, error) {
        if(response) {
          $location.path('/equipment/');
        } else if(error) {
          alert(error);
        }
      });
    }

    $scope.cancel = function() {
      $location.path('/equipment/');
    }
  }

})();