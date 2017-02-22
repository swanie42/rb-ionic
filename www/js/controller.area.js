angular.module('starter.controllers')
.controller('AreaCtrl', [
    '$rootScope',
    '$stateParams',
    'factory.api',
function($rootScope, $stateParams, API) {
console.log('AREA controller: ', this);
var area = this;
area.active = {};

area.init = function() {
        console.log('controller.area.initiliazing', $stateParams);
        console.log('$stateParams.id: ',$stateParams.areaId);
        API.get('areas', $stateParams.areaId)
            .then(area.get.success, area.get.error);
};

    area.get = {
        success: function(res) {
            area.active = res.data;
            // $rootScope.state.title = res.data.name;

            console.debug('controller.area.get.success:', res.data);
            //
            // API.list('scopes', { area: $stateParams.areaId })
            //     .then(area.scope.get.success, area.scope.get.error);
        },
        error: API.debug.error
    };


}])
