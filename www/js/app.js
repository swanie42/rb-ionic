// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
$httpProvider.interceptors.push('API_Interceptor');

$stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.jobs', {
      url: '/jobs',
      views: {
        'menuContent': {
          templateUrl: 'templates/jobs.html',
          controller: 'JobsCtrl as jobs'
        }
      }
    })

  .state('app.job', {
    url: '/jobs/:jobId',
    views: {
      'menuContent': {
        templateUrl: 'templates/job.html',
        controller: 'JobCtrl as job'
      }
    }
  })
  .state('app.scopes', {
    url: '/scopes/:jobId',
    views: {
      'menuContent': {
        templateUrl: 'templates/scopes.html',
        controller: 'ScopesCtrl as scopes'
      }
    }
  })
  .state('app.areas', {
    url: '/areas/:jobId',
    views: {
      'menuContent': {
        templateUrl: 'templates/areas.html',
        controller: 'AreasCtrl as areas'
      }
    }
  })
  .state('app.area', {
    url: '/area/:areaId',
    views: {
      'menuContent': {
        templateUrl: 'templates/area.html',
        controller: 'AreaCtrl as area'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/jobs');
});
