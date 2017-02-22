
angular.module('starter.controllers')
.controller('JobCtrl', [
    '$rootScope',
    '$stateParams',
    'factory.api',
function($rootScope, $stateParams, API) {
console.log('this: ', this);
var job = this;
job.active = {};

job.init = function() {
        console.log('controller.job.initiliazing', $stateParams);
        console.log('$stateParams.id: ',$stateParams.jobId);
        API.get('jobs', $stateParams.jobId)
            .then(job.get.success, job.get.error);
};

    job.get = {
        success: function(res) {
            job.active = res.data;
            // $rootScope.state.title = res.data.name;

            console.debug('controller.job.get.success:', res.data);
            //
            // API.list('scopes', { job: $stateParams.jobId })
            //     .then(job.scope.get.success, job.scope.get.error);
        },
        error: API.debug.error
    };
    

}])
