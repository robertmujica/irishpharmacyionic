/**
 * Created by robertmujica on 12/04/15.
 */
angular.module('irishPharmacyFinderApp', ['ionic', 'ngCordova',
        'app.services.pharmacyFinderApi',
        'app.services.globalSettings',
        'app.services.localizationService',
        'app.services.pharmacySearchService',
        'app.controllers.mapViewCtrl',
        'app.controllers.listViewCtrl',
        'app.controllers.pharmacyViewCtrl',
        'app.controllers.emptyLayoutCtrl',
        'app.controllers.markerViewCtrl',
        'app.controllers.menuLayoutCtrl',
        'uiGmapgoogle-maps',
        'angular-cache'])

    .run(function ($rootScope, $ionicPlatform, CacheFactory, $ionicLoading) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.previousState = fromState;
        });

        //CacheFactory.createCache("pharmaciesCache", { storageMode:"localStorage", maxAge:10000, deleteOnExpire:"aggressive"});
        CacheFactory.createCache("pharmaciesCache", { storageMode: "localStorage", maxAge: 60000, deleteOnExpire: "aggressive"});
        CacheFactory.createCache("globalStaticCache", { storageMode: "localStorage", deleteOnExpire: "aggressive"});

    })
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.tabs.position('bottom'); //other values: top
        $ionicConfigProvider.views.maxCache(0);

        $stateProvider

            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: "app/layout/menu-layout.html"
            })

            .state('app-empty', {
                abstract: true,
                url: '/app-empty',
                templateUrl: "app/layout/empty-layout.html"
            })

            .state('app.mapView', {
                url: '/home',
                views: {
                    "mainContent": {
                        templateUrl: "app/mapView/mapView.html"
                    }
                }
            })

            .state('app.listView', {
                url: '/listView',
                views: {
                    "mainContent": {
                        templateUrl: "app/listView/listView.html"
                    }
                },
            })

            .state('app-empty.listView-details', {
                url: '/listView/:id',
                views: {
                    "mainContent": {
                        templateUrl: "app/pharmacyView/pharmacyView.html"
                    }
                }
            });

        // if none of the above states are matched, use it as the fallback
        $urlRouterProvider.otherwise('/app/home');
    });