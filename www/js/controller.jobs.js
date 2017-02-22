angular.module('starter.controllers')

.controller(
    'JobsCtrl',[ '$rootScope','factory.api',
    function($rootScope, API) {
    var jobs = this;
    $rootScope.state ={};
    jobs.init = function() {
                    $rootScope.state.title = 'All Jobs';
                    var leToken = localStorage.getItem('token');
                    console.log('leToken: ',leToken);
                    API.list('jobs').then(jobs.get.success, jobs.get.error);
                };

                jobs.get = {
                    success: function(res) {

                        jobs.data = res.data;
                        console.log('jobs.data is; ',jobs.data)
                    },
                    error: function(err) {
                        console.error(err);
                    }
                };

    jobs.setActiveJob = function(index){
        $rootScope.activeJob = jobs.data[index];
    };

    }
]);
