/**
 * Created by robertmujica on 03/05/15.
 */
angular.module('app.controllers.emptyLayoutCtrl', [])
    .controller('emptyLayoutCtrl', function ($scope, $rootScope, $state) {
        var vm = this;

        vm.navigateBack = function () {
            $state.go($rootScope.previousState);
        };
    });