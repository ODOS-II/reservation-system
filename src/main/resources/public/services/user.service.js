    var baseUrl = '';

    angular.
    module('Conference').
    factory('userService', function($http) {
        var methods = {};

        methods.create = function(user, cb) {
            $http({
                method: 'POST',
                data: user,
                url: baseUrl + '/users/'
            }).then(function(res) {
                cb(res, null);
            }, function(res) {
                cb(null, res);
            });
        };

        methods.readAll = function(cb) {
            $http({
                method: 'GET',
                url: baseUrl + '/users/'
            }).then(function(res) {
                console.log(res);
                cb(res, null);
            }, function(res) {
                cb(null, res);
            });   
        };

        methods.read = function(id, cb) {
            $http({
                method: 'GET',
                url: baseUrl + '/users/' + id
            }).then(function(res) {
                cb(res, null);
            }, function(res) {
                cb(null, res);
            })
        }

        methods.update = function(user, cb) {
            $http({
                method: 'PUT',
                url: baseUrl + '/users/' + user.id,
                data: user
            }).then(function(res) {
                cb(res, null);
            }, function(res) {
                cb(null, res);
            })
        }

        methods.delete = function(id, cb) {
            $http({
                method: 'DELETE',
                url: baseUrl + '/users/' + id
            }).then(function(res) {
                cb(res, null);
            }, function(res) {
                cb(null, res);
            })
        }


        return methods;
    });