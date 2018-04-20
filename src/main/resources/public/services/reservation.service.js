var baseUrl = '';

'use strict';
angular.
  module('Conference').
  factory('reservationService', function ($http, $q) {

    var methods = {};

    methods.create = function (roomId, postData, cb) {
    	var index = roomId.lastIndexOf('/');
    	var id = roomId.substring(index +1);
    	postData = JSON.stringify(postData);
      $http({
        method: 'POST',
        url: '/reservations',
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
        var promises = roomIdArray.map(function(roomId) {
            return methods.getReservationsForRoom(roomId);
        });
        return $q.all(promises);
    }
    methods.getReservationsForRoom = function (roomId) {
        return $http({
            method: 'GET',
            url: baseUrl + '/rooms/'+roomId+'/reservations/'
        }).then(function (res) {
            return { roomId: roomId, reservations: res.data};
        }, function (err) {
            return err;
        })
    }

    methods.read = function (id, cb) {
      $http({
        method: 'GET',
        url: baseUrl + '/reservations/' + id
      }).then(function (res) {
        cb(res);
      }, function (res) {
        cb(false);
      })
    }

    methods.readAll = function (cb) {
      $http({
        method: 'GET',
        url: baseUrl + '/reservations/'
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

    methods.delete = function (id, cb) {
      $http({
        method: 'DELETE',
        url: baseUrl + '/reservations/' + id
      }).then(function (res) {
        cb(true);
      }, function (res) {
        cb(false);
      })
    }

    return methods;
  });