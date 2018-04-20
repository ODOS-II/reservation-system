
    var baseUrl = '';

    'use strict';
    angular.
    module('Conference').
    factory('equipmentService', function($http) {

        var methods = {};
    methods.create = function(equipment, cb) {
        $http({
            method: 'POST',
            data: equipment,
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
            cb(res.data);
        }, function(res) {
            cb(false);
        })
    }

    methods.readAll = function(cb) {
        $http({
            method: 'GET',
            url: baseUrl + '/avEquipment/'
        }).then(function(res) {
            cb(res.data._embedded.avEquipment);
        }, function(res) {
            cb(false);
        });
    }

    methods.update = function(equipment, cb) {
    	
    	var index = equipment._links.self.href.lastIndexOf('/');
    	var id = equipment._links.self.href.substring(index +1);
        $http({
            method: 'PUT',
            url: baseUrl + '/avEquipment/' + id,
            data: equipment
        }).then(function(res) {
            cb(res);
        }, function(res) {
            cb(false);
        })
    }

    methods.delete = function(href, cb) {
        $http({
            method: 'DELETE',
            url: href
        }).then(function(res) {
            cb(true);
        }, function(res) {
            cb(false);
        })
    }

    return methods;
});