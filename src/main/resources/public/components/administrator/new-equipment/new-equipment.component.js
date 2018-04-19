(function() {
  'use strict';

  // Register 'newUser' component, along with its associated controller and template
  angular.
  module('newEquipment').
  component('newEquipment', {
    templateUrl: 'components/administrator/new-equipment/new-equipment.template.html',
    controller: ['equipmentService', '$scope', '$location', NewEquipmentController],
    controllerAs: 'newEquipment'
  });

  function NewEquipmentController(equipmentService, $scope, $location) {

    $scope.create = function(user) {
      equipmentService.create(user, function(response, error) {
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