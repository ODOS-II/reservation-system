(function () {
  'use strict';

  // Register 'viewHome' component, along with its associated controller and template
  angular.
    module('viewLogin').
    component('viewLogin', {
      templateUrl: 'components/view-login/view-login.template.html',
      controller: ['$window', 'loginService', LoginController],
      controllerAs: 'login',
    });


  // Controller - data binds to view-login template
  function LoginController($window, loginService) {
    var self = this;

    self.submit = () => {
      $window.location.href = '/#!/home';
    }
  }
})();