angular.module('starter.controllers')

.controller(
    'AreasCreateCtrl',[ '$rootScope','factory.api', '$stateParams', '$ionicModal', '$timeout', '$scope',
    function($rootScope, API, $stateParams, $ionicModal, $timeout, $scope) {
    var areasCreate = this;
    $rootScope.state ={};

    console.log('AreasCreate controller loading');

    areasCreate.payload = {};

    $scope.closeModal = function(){
        $scope.modal.hide();
        console.log("Modal closed");
    };



    areasCreate.add = {
                submit: function() {

                    areasCreate.payload.job = $stateParams.jobId;


                    console.log('controller.areasCreate.add.submit.payload:', areasCreate.payload);
                    API.add('areas', areasCreate.payload)
                        .then(areasCreate.add.success,areasCreate.add.error);
                        console.log("job: ",areasCreate.payload.job );
                        $scope.closeModal();

                },
                success: function(res) {

                    $rootScope.active.areasCreate.push(res.data);
                    console.log('this area posted!', res.data)
                    areasCreate.payload = {};
                },
                error: API.debug.error

            };



    // Perform the login action when the user submits the login form

}
]);
