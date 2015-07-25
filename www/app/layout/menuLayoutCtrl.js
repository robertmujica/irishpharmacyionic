/**
 * Created by robertmujica on 08/05/15.
 */
angular.module('app.controllers.menuLayoutCtrl', [])
    .controller('menuLayoutCtrl', function ($scope, $rootScope, $state, globalSettings) {
        var vm = this;

        vm.radiusList = [
            { radius: 10000000, radiusText : "All" },
            { radius: 3000, radiusText : "3 Km" },
            { radius: 5000, radiusText : "5 Km" },
            { radius: 10000, radiusText : "10 Km" },
            { radius: 20000, radiusText : "20 Km" },
            { radius: 100000, radiusText : "100 Km" }
        ];

        vm.onListViewNavigation = function () {
            $state.go("app.listView");
        };

        vm.onRadiusChange = function(radius){
            globalSettings.setCurrentRadiusDistance(radius);
            $(document).trigger('radiusChanged', { radius: radius });
        };
    });