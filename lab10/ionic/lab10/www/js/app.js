// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.routes'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
    
    
.controller('alchemyCtrl', function($scope, $http) {
    
    $scope.getResult = function(searchKey, searchURL) {
        var url= 'http://alechemydemo.mybluemix.net/api/Alchemy/search/'+searchKey+'/'+searchURL;
        console.log(url);
        $http.get(url) 
            .success(function(data) { 
                console.log(data);
                $scope.result = data;
            }) 
            .error(function(err) { 
                console.log("data not received from url");
            }); 
        }
})

.controller('transCtrl', function($scope, $http) {
    
    $scope.getResult = function(source, target, text) {
        var url= 'http://alechemydemo.mybluemix.net/api/translate/'+source+'/'+target+'/'+text;
        console.log(text);
        $http.get(url) 
            .success(function(data) { 
                console.log(data);
                $scope.result = data;
            }) 
            .error(function(err) { 
                console.log("data not received from input");
            }); 
        }
})


.controller('visualCtrl', function($scope, $http) {
    
    $scope.getResult = function(searchLabel, searchURL) {
        
        if (searchLabel==null){
        var url= 'http://alechemydemo.mybluemix.net/api/visual/search/'+searchURL;
        }
        else
        var url= 'http://alechemydemo.mybluemix.net/api/visual/search/'+searchLabel+'/'+searchURL;
        console.log(url);
        $http.get(url) 
            .success(function(data) { 
                console.log(data);
                $scope.result = data;
            }) 
            .error(function(err) { 
                console.log("data not received from url");
            }); 
    }
    
    
    
    
})

