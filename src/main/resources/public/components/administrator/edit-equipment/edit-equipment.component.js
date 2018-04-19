(function() {
  'use strict';

  // Register 'newUser' component, along with its associated controller and template
  angular.
  module('editEquipment').
  component('editEquipment', {
    templateUrl: 'components/administrator/edit-equipment/edit-equipment.template.html',
    controller: ['equipmentService', '$scope, $location', '$routeParam', EditEquipmentController],
    controllerAs: 'editEquipment'
  });

  function EditEquipmentController(equipmentService, $scope, $location, $routeParam) {

    $scope.equipment = {};
    if($routeParam.id) {
      equipmentService.read($routeParam.id , function(response, error) {
      if(response) {
        $scope.equipment = response.body;
      } else if(error) {
        alert('Error getting user! ');
        $location.path('/users/');
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
          alert(error.body);
        }
      });
    }

    $scope.cancel = function() {
      $location.path('/equipment/');
    }
  }

})();