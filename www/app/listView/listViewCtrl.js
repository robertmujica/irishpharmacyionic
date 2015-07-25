/**
 * Created by robertmujica on 26/04/15.
 */
angular.module('app.controllers.listViewCtrl', [])
    .controller('listViewCtrl',
    function ($scope, $rootScope, $state, pharmacySearchService, $ionicLoading, globalSettings) {
        var vm = this;

        $ionicLoading.show({ template: 'Loading ...'});
        pharmacySearchService.getAllNearestPharmacies(globalSettings.getCurrentRadiusDistance()).then(function (data) {
            vm.pharmacies = data.data;
            $ionicLoading.hide();
        });

        vm.selectPharmacy = function (pharmacy) {
            $rootScope.selectedPharmacy = pharmacy;
            $state.go("app-empty.listView-details", {id: pharmacy.Id});
        };

        vm.makePhoneCall = function(pharmacy){
            document.location.href = 'tel:' + pharmacy.PhoneNumber;
        };

        vm.navigate = function(pharmacy){
            window.location = "geo:0,0?q=" + pharmacy.Lat + "," + pharmacy.Long + " (" +  pharmacy.Name + ")";
        };

        $(document).on('radiusChanged', function(e, data){
            console.log('in : ' + data);
            pharmacySearchService.getAllNearestPharmacies(data.radius).then(function (data) {
                vm.pharmacies = data.data;
                $ionicLoading.hide();
            });
        })

    });