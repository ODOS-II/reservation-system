(function() {
  'use strict';

  // Register 'viewHome' component, along with its associated controller and template
  angular.
  module('viewHome').
  component('viewHome', {
    templateUrl: 'components/view-home/view-home.template.html',
    controller: ['$window', 'homeService', HomeController],
    controllerAs: 'home',
  });

  // Controller - data binds to view-home template
  function HomeController($window, homeService) {
    this.newConference = () => {
      $window.location.href = '/#!/conferences/request';
    }
  }
})();