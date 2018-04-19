
    var baseUrl = '';

    'use strict';
    angular.
    module('Conference').
    factory('equipmentService', function($http) {
    methods.create = function(equipment, cb) {
        $http({
            method: 'POST',
            data: user,
            url: baseUrl + '/avEquipment/'
        }).then(function(res) {
            cb(res);
        }, function(res) {
            cb(res);
        });
    }

    methods.read = function(id, cb) {
        $http({
            method: 'GET',
            url: baseUrl + '/avEquipment/' + id
        }).then(function(res) {
            cb(res);
        }, function(res) {
            cb(false);
        })
    }

    methods.readAll = function(cb) {
        $http({
            method: 'GET',
            url: baseUrl + '/avEquipment/'
        }).then(function(res) {
            cb(res);
        }, function(res) {
            cb(false);
        });
    }

    methods.update = function(equipment, cb) {
        $http({
            method: 'PUT',
            url: baseUrl + '/avEquipment/' + equipment.id,
            data: user
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

    return methods;
});