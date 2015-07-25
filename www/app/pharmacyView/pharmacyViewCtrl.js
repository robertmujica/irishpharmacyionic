/**
 * Created by robertmujica on 26/04/15.
 */
angular.module('app.controllers.pharmacyViewCtrl', [])
    .controller('pharmacyViewCtrl', function ($scope, $filter, $rootScope, $state,
                                              $stateParams, pharmacyFinderApi, localizationService) {
        var vm = this;

        vm.pharmacy = {};

        vm.pharmacy.pharmacyDetails = $rootScope.selectedPharmacy;

        pharmacyFinderApi.getPharmacyOpeningHours($rootScope.selectedPharmacy.Id).then(function (openingTimeData) {
            var openingTimeTemp = [];

            for(var i = 0; i < openingTimeData.length; i++){
                var time = {
                    day : openingTimeData[i].Day,
                    dayName : getTodayDetails(openingTimeData[i].Day).name,
                    openingTime : workOutOpeningTime(openingTimeData[i].StartTime, openingTimeData[i].EndTime)
                }
                openingTimeTemp.push(time);
            };

            vm.pharmacy.openingTime = openingTimeTemp;
            vm.pharmacy.pharmacyDetails.todayOpeningTime = getTodayOpeningTime(openingTimeTemp);

        });

        function getTodayDetails(dayId){
            var weekDays = localizationService.getWeekDayList();

            return _.findWhere(weekDays, { day : dayId });
        }

        function getTodayOpeningTime(openingTimeList){
            var d = new Date();
            var day = d.getDay() + 1;

            var today = _.findWhere(openingTimeList, { day : day });

            return "Today : " + today.openingTime;
        }

        function workOutOpeningTime(startTime, endTime){
            var start = $filter('date')(startTime,'HH:mm');
            var end = $filter('date')(endTime,'HH:mm');

            return start + " - " + end;
        }
    });