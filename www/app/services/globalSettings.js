/**
 * Created by robertmujica on 02/05/15.
 */

angular.module("app.services.globalSettings", [])
    .factory("globalSettings", function (CacheFactory) {

        var listCurrentCacheKey = "listCurrentCacheKey",
            currentRadiusCacheKey = "currentRadiusKey";

        self.globalSettingsCache = CacheFactory.get("globalStaticCache");

        function getListCurrentCacheKey() {
            return  self.globalSettingsCache.get(listCurrentCacheKey);
        }

        function setListCurrentCacheKey(cacheKey) {
            self.globalSettingsCache.put(listCurrentCacheKey, cacheKey);
        }

        function getCurrentRadiusDistance() {
            var radius =  self.globalSettingsCache.get(currentRadiusCacheKey);
            if(radius === undefined){
                return 3000;
            }
            return radius;
        }

        function setCurrentRadiusDistance(radius){
            self.globalSettingsCache.put(currentRadiusCacheKey, radius);
        }

        return{
            getListCurrentCacheKey: getListCurrentCacheKey,
            setListCurrentCacheKey: setListCurrentCacheKey,
            getCurrentRadiusDistance : getCurrentRadiusDistance,
            setCurrentRadiusDistance : setCurrentRadiusDistance
        }
    });