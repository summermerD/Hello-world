var services = angular.module("starter.services", []);

var url = "http://localhost:9080/MongoRestApp/user";

services.factory('MongoRESTService', function($http) {
    return {
      validate: function(username, password, callback) {

        var res = $http.get(url+"?username="+username+"&password="+password);

        res.success(function(data, status, headers, config) {
          console.log(data);
          callback(data);
        });
        res.error(function(data, status, headers, config) {
          console.log(data);
        });
      },

      register: function(user, successCallback) {
        console.log(user);
        var res = $http.post(url, user);

        res.success(function(data, status, headers, config) {
          successCallback(data);
        });
        res.error(function(data, status, headers, config) {
          console.log(data);
        });
      },
        
      update: function(username,password, id, newPassword, successCallback) {
        var res = $http.put(url+"?username="+username+"&newpass="+newPassword+"&id="+id);

        res.success(function(data, status, headers, config) {
          successCallback(data);
        });
        res.error(function(data, status, headers, config) {
          console.log(data);
        });
      },  
        
        delete: function(id,successCallback) {
        var res = $http.delete(url+"?&id="+id);

        res.success(function(data, status, headers, config) {
          successCallback(data);
        });
        res.error(function(data, status, headers, config) {
          console.log(data);
        });
      },    
        
    }
    });
