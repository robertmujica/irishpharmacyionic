/**
 * Created by robertmujica on 16/04/15.
 */

angular.module('app.controllers.mapViewCtrl', [])
    .controller('mapViewCtrl', function ($scope,
                                         $rootScope,
                                         $stateParams,
                                         $cordovaGeolocation,
                                         pharmacySearchService,
                                         $ionicLoading,
                                         globalSettings) {
        var vm = this;

        $(document).on('radiusChanged', function(e, data){
            console.log('in : ' + data);
            pharmacySearchService.getAllNearestPharmacies(data.radius).then(function (data) {
                //vm.pharmacies = data.data;
                updateModelAndMerkers(data);
                $ionicLoading.hide();
            });
        });

        $ionicLoading.show({ template: 'Loading ...'});
        pharmacySearchService.getAllNearestPharmacies(globalSettings.getCurrentRadiusDistance()).then(function (data) {
            updateModelAndMerkers(data);
        });

        function updateModelAndMerkers(data){
            vm.pharmacies = data.data;
            vm.map = {
                center: {
                    latitude: data.position.latitude,
                    longitude: data.position.longitude
                },
                zoom: 12
            };

            loadPharmacyMarkers(vm.pharmacies);
        };

        function loadPharmacyMarkers(pharmacies) {
            var markers = [];

            for (var i = 0; i < pharmacies.length; i++) {
                var marker = {
                    id: pharmacies[i].Id,
                    coords: {
                        latitude: pharmacies[i].Lat,
                        longitude: pharmacies[i].Long,
                    },
                    show: false,
                    data: pharmacies[i]
                }
                markers.push(marker);
            }
            ;

            vm.map.markers = markers;
            vm.map.markersEvents = {
                mousedown: onMarkerSelected
            };
            vm.map.window = {
                marker: {},
                show: false,
                closeClick: function () {
                    //this.show = false;
                    vm.map.window.show = false;
                },
                options: {} // define when map is ready
            };

            function onMarkerSelected (marker, eventName, model, arguments) {
                vm.map.window.model = model;
                vm.map.window.show = true;
                vm.map.center = {
                    latitude: model.coords.latitude,
                    longitude: model.coords.longitude
                };
            }

            $ionicLoading.hide();

        };
    });