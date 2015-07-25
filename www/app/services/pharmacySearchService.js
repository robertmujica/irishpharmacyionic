/**
 * Created by robertmujica on 04/05/15.
 */

angular.module("app.services.pharmacySearchService", [])
    .factory("pharmacySearchService", function ($q, $cordovaGeolocation, pharmacyFinderApi) {

        var posOptions = {timeout: 10000, enableHighAccuracy: false};

        function getAllNearestPharmacies(radius){
            var deferred = $q.defer();

            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {

                    /*var map ={
                        center : {
                            latitude : position.coords.latitude,
                            longitude : position.coords.longitude
                        },
                        zoom : 12
                    };*/

                    pharmacyFinderApi.
                        getAllNearestPharmacies(position.coords.latitude,
                            position.coords.longitude, radius).then(function(data){
                            deferred.resolve(
                                { data : data,
                                    position : {
                                        latitude : position.coords.latitude,
                                        longitude : position.coords.longitude
                                    }});
                        });

                }, function(err) {
                    deferred.reject();
                    // error
                    console.log("error getCurrentPosition");
                });

            return deferred.promise;
        }

        return{
            getAllNearestPharmacies : getAllNearestPharmacies
        }

    });