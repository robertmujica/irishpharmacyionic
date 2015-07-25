/**
 * Created by robertmujica on 05/05/15.
 */
angular.module('app.controllers.markerViewCtrl', [])
    .controller('markerViewCtrl', function ($scope, $filter, $rootScope, $state) {
        var vm = this;

        vm.selectPharmacy = function(pharmacy){
            $rootScope.selectedPharmacy = pharmacy;
            $state.go("app-empty.listView-details", {id: pharmacy.Id});
        };

        vm.navigate = function(pharmacy){
            console.log(pharmacy);
            window.location = "geo:0,0?q=" + pharmacy.Lat + "," + pharmacy.Long + " (" +  pharmacy.Name + ")";
        };

        vm.makePhoneCall = function(pharmacy){
            document.location.href = 'tel:' + pharmacy.PhoneNumber;
        };
    });