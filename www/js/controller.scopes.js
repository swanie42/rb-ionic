angular.module('starter.controllers')

.controller(
    'ScopesCtrl',[ '$rootScope','factory.api', '$stateParams',
    function($rootScope, API, $stateParams) {
    var scopes = this;
    $rootScope.state ={};
    scopes.init = function() {
            console.log('the scopes.init is happening');
                    var leToken = localStorage.getItem('token');
                    console.log('leToken: ',leToken);
                    API.list('scopes', {
                        job: $stateParams.jobId
                    }).then(scopes.get.success, scopes.get.error);
                    scopes.jobId = $stateParams.jobId;
                };

                scopes.get = {
                    success: function(res) {

                        scopes.data = res.data;
                        console.log('scopes.data is; ',scopes.data);
                    },
                    error: function(err) {
                        console.error(err);
                    }
                };

    scopes.setActiveScope= function(index){
        $rootScope.activeScope = scopes.data[index];
    };

    }
]);
