(function() {
  'use strict';

  // Register 'newEquipment' component, along with its associated controller and template
  angular.
  module('viewEquipment').
  component('viewEquipment', {
    templateUrl: 'components/administrator/view-equipment/view-equipment.template.html',
    controller: ['equipmentService', '$scope, $location', ViewEquipmentController],
    controllerAs: 'viewEquipment'
  });

  function ViewEquipmentController($scope, userService) {

    $scope.equipment = [];
    $scope.error = false;

    equipmentService.readAll(function(res, error) {
      if(res) {
        $scope.equipment = res.body;
      } else if(error) {
        $scope.error = true;
      }
    });

    $scope.edit = function(i) {
      $location.path('/equipment/edit/' + $scope.equipment[i]);
    }

    $scope.delete = function(i) {
      equipmentService.delete(equipment[i], function(response, error) {
        if(response) {
           $scope.equipment.splice(i, 1);
        } else if(error) {
          console.log(error);
          alert('There was an error deleting AvEquipment. Please check console log for more information.');
        }
      })
    }
  }

})();