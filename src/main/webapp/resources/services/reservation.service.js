var baseUrl = '';

'use strict';
angular.
  module('Conference').
  factory('reservationService', function ($http) {

    var methods = {};

    methods.create = function (roomId, postData, cb) {
      $http({
        method: 'POST',
        url: baseUrl + '/rooms/' + roomId + '/reservations/',
        data: postData
      }).then(function (res) {
        cb(res);
      }, function (res) {
        cb(false);
      })
    }

    /*methods.create = function (reservation, cb) {
      $http({
        method: 'POST',
        data: user,
        url: baseUrl + '/reservation/'
      }).then(function (res) {
        cb(res);
      }, function (res) {
        cb(res);
      });
    }*/

    methods.getRooms = function (cb) {
      $http({
        method: 'GET',
        url: baseUrl + '/rooms/'
      }).then(function (res) {
        cb(res);
      }, function (res) {
        cb(false);
      })
    }

    methods.read = function (roomId, reservationId, cb) {
      $http({
        method: 'GET',
        url: baseUrl + '/rooms/' + roomId + '/reservations/' + id
      }).then(function (res) {
        cb(res);
      }, function (res) {
        cb(false);
      })
    }

    methods.readAll = function (roomId, cb) {
      $http({
        method: 'GET',
        url: baseUrl + '/rooms/' + roomId + '/reservations/'
      }).then(function (res) {
        cb(res);
      }, function (res) {
        cb(false);
      })
    }

    methods.update = function (roomId, reservation, cb) {
      $http({
        method: 'PUT',
        url: baseUrl + '/rooms/' + roomId + '/reservations/' + reservation.id,
        data: user
      }).then(function (res) {
        cb(res);
      }, function (res) {
        cb(false);
      })
    }

    methods.delete = function (roomId, reservationId, cb) {
      $http({
        method: 'DELETE',
        url: baseUrl + '/rooms/' + roomId + '/reservations/' + reservationId
      }).then(function (res) {
        cb(true);
      }, function (res) {
        cb(false);
      })
    }

    return methods;
  });