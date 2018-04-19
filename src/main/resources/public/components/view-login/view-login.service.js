(function() {
  'use strict';
  angular.
  module('viewLogin').
  factory('loginService', loginService);

  //Took out http object injection
  //homeService.$inject = ['$http'];

  // Home service
  function loginService() { //$http
    var service = {
    }
    return service;

  }
})();