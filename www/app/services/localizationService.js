/**
 * Created by robertmujica on 04/05/15.
 */
angular.module("app.services.localizationService", [])
    .factory("localizationService", function (CacheFactory) {

        function getWeekDayList(){
            return [
                {day: 1, name : "Monday"},
                {day: 2, name : "Tuesday"},
                {day: 3, name : "Wednesday"},
                {day: 4, name : "Thursday"},
                {day: 5, name : "Friday"},
                {day: 6, name : "Saturday"},
                {day: 7, name : "Sunday"}
            ];
        }

        return{
            getWeekDayList: getWeekDayList
        }

    });