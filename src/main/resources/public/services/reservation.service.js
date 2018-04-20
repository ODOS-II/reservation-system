var baseUrl = '';

'use strict';
angular.
  module('Conference').
  factory('reservationService', function ($http, $q) {

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

    methods.getReservationsForRooms = function (roomIdArray) {
        // We need a simplified service instead of calling this in a loop
        var promises = roomIdArray.map(function(roomId) {
            return { reservation: methods.getReservationsForRoom(roomId) , roomId: roomId};
        });
        return $q.all(promises);
    }
    methods.getReservationsForRoom = function (roomId) {
        return $http({
            method: 'GET',
            url: baseUrl + '/rooms/'+roomId+'/reservations/'
        }).then(function (res) {
            return res;
        }, function (err) {
            return err;
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
        data: reservation
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