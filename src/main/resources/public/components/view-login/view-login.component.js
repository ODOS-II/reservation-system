(function () {
  'use strict';

  // Register 'viewHome' component, along with its associated controller and template
  angular.
    module('viewLogin').
    component('viewLogin', {
      templateUrl: 'components/view-login/view-login.template.html',
      controller: ['loginService', LoginController],
      controllerAs: 'login',
    });


  // Controller - data binds to view-login template
  function LoginController(loginService) {
  }
})();