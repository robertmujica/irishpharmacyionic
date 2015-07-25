/**
 * Created by robertmujica on 12/04/15.
 */

angular.module('app.services.pharmacyFinderApi', [])
    .factory('pharmacyFinderApi', function ($http, $q, $ionicLoading, CacheFactory, globalSettings) {

        var pharmacies = JSON.parse('[' +
            '{"id":"111", ' +
            '"name":"Boots", ' +
            '"distance":"1 km", ' +
            '"address":"Unit 7, The Village Centre, Rathborne Court, Ashtown, Dublin 15"}, ' +
            '{"id":"112", ' +
            '"name":"LloydsFarmacy", ' +
            '"distance":"3.6 km", ' +
            '"address":"Unit 7, The Village Centre, Rathborne Court, Ashtown, Dublin 15"},' +
            '{"id":"113", ' +
            '"name":"Lloyds", ' +
            '"distance":"4.6 km", ' +
            '"address":"Unit 7, The Village Centre, Rathborne Court, Ashtown, Dublin 15"},' +
            '{"id":"114", ' +
            '"name":"Test Pharmacy Dublin Dublin", ' +
            '"distance":"4.6 km", ' +
            '"address":"Unit 7, The Village Centre, Rathborne Court, Ashtown, Dublin 15"},' +
            '{"id":"115", ' +
            '"name":"Test Pharmacy Dublin Dublin", ' +
            '"distance":"5.6 km", ' +
            '"address":"Unit 7, The Village Centre, Rathborne Court, Ashtown, Dublin 15"}]');

        self.pharmacyCache = CacheFactory.get("pharmaciesCache");

        function getAllPharmacies() {

            var deferred = $q.defer(),
                cacheKey = "pharmacies",
                pharmaciesData = self.pharmacyCache.get(cacheKey);

            if (pharmaciesData) {
                //console.log("Data found in cache :", pharmaciesData);
                deferred.resolve(pharmaciesData);
            } else {
                $ionicLoading.show({ template: 'Loading ...'});

                $http.get('https://pharmacylocation.azure-mobile.net/api/getallpharmacies')
                     .success(function (data, status) {
                        //console.log('Received data via HTTP.', data, status);
                        $ionicLoading.hide();
                        self.pharmacyCache.put(cacheKey, data);
                        deferred.resolve(data);
                    })
                    .error(function () {
                        //console.log("Error while making HTTP call");
                        $ionicLoading.hide();
                        deferred.reject();
                    });
            }

            globalSettings.setListCurrentCacheKey(cacheKey);
            return deferred.promise;
            //return pharmacies;
        }

        function getAllNearestPharmacies(latitude, longitude, distance) {
            //https://pharmacylocation.azure-mobile.net/api/getallnearestpharmacies?latitude=53.370961
            // &longitude=%20-6.332655
            // &distance=100000000

            var deferred = $q.defer(),
                cacheKey = "allNearestPharmacies" + distance,
                pharmaciesData = self.pharmacyCache.get(cacheKey);

            if (pharmaciesData) {
                console.log("Data found in cache :", pharmaciesData);
                deferred.resolve(pharmaciesData);
            } else {

                $ionicLoading.show({ template: 'Loading ...'});
                $http.get('https://pharmacylocation.azure-mobile.net/api/getallnearestpharmacies?latitude=' +
                        latitude + '&longitude=' + longitude + '&distance=' + distance)
                    .success(function (data, status) {
                        console.log('Received data via HTTP.', data, status);
                        $ionicLoading.hide();
                        self.pharmacyCache.put(cacheKey, data);
                        deferred.resolve(data);
                    })
                    .error(function () {
                        console.log("Error while making HTTP call");
                        $ionicLoading.hide();
                        deferred.reject();
                    });
            }

            globalSettings.setListCurrentCacheKey(cacheKey);
            return deferred.promise;
        }

        function getOpenOnlyNearestPharmacies(latitude, longitude, distance, dayOfWeek, currentTime) {
            // https://pharmacylocation.azure-mobile.net/api/getopenonlynearestpharmacies
            // ?latitude=53.370961
            // &longitude=%20-6.332655
            // &distance=10000
            // &dayOfWeek=6
            // &currentTime=21:33:50.377

            var deferred = $q.defer(),
                cacheKey = "OpenOnlyNearestPharmacies",
                pharmaciesData = self.pharmacyCache.get(cacheKey);

            if (pharmaciesData) {
                console.log("Data found in cache :", pharmaciesData);
                deferred.resolve(pharmaciesData);
            } else {

                $ionicLoading.show({ template: 'Loading ...'});

                $http.get('https://pharmacylocation.azure-mobile.net/api/getopenonlynearestpharmacies' +
                        latitude + '&longitude=' + longitude + '&distance=' + distance +
                        "&dayOfWeek=" + dayOfWeek + "&currentTime" + currentTime)
                    .success(function (data, status) {
                        console.log('Received data via HTTP.', data, status);
                        $ionicLoading.hide();
                        self.pharmacyCache.put(cacheKey, data);
                        deferred.resolve(data);
                    })
                    .error(function () {
                        console.log("Error while making HTTP call");
                        $ionicLoading.hide();
                        deferred.reject();
                    });
            }

            globalSettings.setListCurrentCacheKey(cacheKey);
            return deferred.promise;

        }

        function getPharmacyDetails(pharmacyId) {
            var dataCacheKey = globalSettings.getListCurrentCacheKey(),
                deferred = $q.defer(),
                pharmaciesData;

            if (dataCacheKey === null) {
                return null;
            }

            pharmaciesData = self.pharmacyCache.get(dataCacheKey);

            var pharmacyData = _.findWhere(pharmaciesData, { Id: pharmacyId });

            if (pharmacyData !== undefined) {
                /*getPharmacyOpeningHours(pharmacyId).then(function(data){
                 var pharmacy ={
                 openingTime : data,
                 pharmacyDetails : pharmacyData
                 };*/

                deferred.resolve(pharmacyData);

                //})
            } else {
                deferred.reject();
            }

            return deferred.promise;
        }

        function getPharmacyOpeningHours(pharmacyId) {
            //https://pharmacylocation.azure-mobile.net/api/getpharmacyopeningtime?Id=158

            var deferred = $q.defer(),
                cacheKey = "PharmacyOpeningHours_" + pharmacyId,
                openingTimeData = self.pharmacyCache.get(cacheKey);

            if (openingTimeData) {
                console.log("Data found in cache :", openingTimeData);
                deferred.resolve(openingTimeData);
            } else {

                $ionicLoading.show({ template: 'Loading ...'});

                $http.get('https://pharmacylocation.azure-mobile.net/api/getpharmacyopeningtime?Id=' +
                        pharmacyId)
                    .success(function (data, status) {
                        console.log('Received data via HTTP.', data, status);
                        $ionicLoading.hide();
                        self.pharmacyCache.put(cacheKey, data);
                        deferred.resolve(data);
                    })
                    .error(function (error) {
                        console.log("Error while making HTTP call");
                        $ionicLoading.hide();
                        deferred.reject();
                    });
            }

            return deferred.promise;
        }

        return{
            getAllPharmacies: getAllPharmacies,
            getAllNearestPharmacies: getAllNearestPharmacies,
            getOpenOnlyNearestPharmacies: getOpenOnlyNearestPharmacies,
            getPharmacyDetails: getPharmacyDetails,
            getPharmacyOpeningHours: getPharmacyOpeningHours
        }

    });