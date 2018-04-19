    var baseUrl = '';

    'use strict';
    angular.
    module('Conference').
    factory('roomService', function ($http) { 
    
        var methods = {};

    methods.create = function(user, cb) {
        $http({
            method: 'POST',
            data: room,
            url: baseUrl + '/rooms/'
        }).then(function(res) {
            cb(res);
        }, function(res) {
            cb(res);
        });
    }

    methods.read = function(id, cb) {
        $http({
            method: 'GET',
            url: baseUrl + '/rooms/' + id
        }).then(function(res) {
            cb(res);
        }, function(res) {
            cb(false);
        })
    }

    methods.readAll = function(cb) {
        $http({
            method: 'GET',
            url: baseUrl + '/rooms/'
        }).then(function(res) {
            cb(res);
        }, function(res) {
            cb(false);
        });
    }

    methods.update = function(room, cb) {
        $http({
            method: 'PUT',
            url: baseUrl + '/rooms/' + room.id,
            data: room
        }).then(function(res) {
            cb(res);
        }, function(res) {
            cb(false);
        })
    }

    methods.delete = function(id, cb) {
        $http({
            method: 'DELETE',
            url: baseUrl + '/rooms/' + id
        }).then(function(res) {
            cb(true);
        }, function(res) {
            cb(false);
        })
    }

    methods.getEquipment = function(id, cb) {
        $http({
            method: 'GET',
            url: baseUrl + '/rooms/' + id + '/avEquipment'
        }).then(function(res) {
            cb(res);
        }, function(res) {
            cb(false);
        });
    }

    return methods;
});