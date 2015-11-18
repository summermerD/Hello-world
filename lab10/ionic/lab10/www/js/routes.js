angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
    })

    .state('alchemy', {
      url: '/alchemy',
      controller: 'alchemyCtrl',
      templateUrl: 'templates/alchemy.html',
    })
    
    .state('visual', {
      url: '/visual',
      controller: 'visualCtrl',
      templateUrl: 'templates/visual.html',
    })
    
    .state('translate', {
      url: '/translate',
      controller: 'transCtrl',
      templateUrl: 'templates/translate.html',
    })
    ;

  // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
});