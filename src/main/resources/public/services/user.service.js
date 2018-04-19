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
                cb(res.data._embedded.users, null);
            }, function(res) {
                cb(null, res);
            });   
        };

        methods.read = function(id, cb) {
        	var index = equipment._links.self.href.lastIndexOf('/');
        	var id = equipment._links.self.href.substring(index +1);
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
        	var index = user._links.self.href.lastIndexOf('/');
        	var id = user._links.self.href.substring(index +1);
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

        methods.delete = function(href, cb) {
            $http({
                method: 'DELETE',
                url: baseUrl + '/users/' + href
            }).then(function(res) {
                cb(res, null);
            }, function(res) {
                cb(null, res);
            })
        }


        return methods;
    });