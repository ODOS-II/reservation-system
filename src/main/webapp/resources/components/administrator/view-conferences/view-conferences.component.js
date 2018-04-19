(function() {
  'use strict';

  // Register 'newUser' component, along with its associated controller and template
  angular.
  module('viewConferences').
  component('viewConferences', {
    templateUrl: 'components/administrator/view-confrences/view-conferences.template.html',
    controller: ['conferenceService', '$scope', '$location', ViewConferencesController],
    controllerAs: 'viewConferences'
  });

  function ViewConferencesController(userService, $scope, $location) {

    $scope.conferences = [];
    $scope.error = false;

    conferenceService.readAll(function(res, error) {
      if(res) {
        $scope.conferences = res.body;
      } else if(error) {
        $scope.error = true;
      }
    });


    $scope.edit = function(i) {
      $location.path('/conferences/edit/' + $scope.conferences[i]);
    }

    $scope.delete = function(i) {
      conferenceService.delete(id, function(response, error) {
        if(response) {
           $scope.conferences.splice(i, 1);
        } else if(error) {
          console.log(error);
          alert('There was an error deleting user. Please check console log for more information.');
        }
      })
    }
  }


})();