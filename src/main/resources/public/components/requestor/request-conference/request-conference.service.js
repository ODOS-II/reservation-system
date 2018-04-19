(function () {
  'use strict';

  angular.
    module('requestConference').
    factory('requestConferenceService', requestConferenceService);

  requestConferenceService.$inject = ['$http'];
  // requestConferenceService service
  function requestConferenceService($http) {

    // each funtion added and returned as a service
    var service = {
      createConference
    }
    return service;

    // http requests here
    function createConference(postData, cb) {
      $http({
        method: 'POST',
        data: postData,
        url: 'backendurl'
      }).then(function successCallback(response) { cb(response);
      }, function errorCallback(response) { cb(response); });
    }
  }
})();