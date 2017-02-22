angular.module('starter.controllers')

.controller(
    'AreasCtrl',[ '$rootScope','factory.api', '$stateParams', '$ionicModal', '$timeout',
    function($rootScope, API, $stateParams, $ionicModal, $timeout) {
    var areas = this;
    $rootScope.state ={};
    areas.init = function() {
            console.log('the areas.init is happening');
                    var leToken = localStorage.getItem('token');
                    console.log('leToken: ',leToken);
                    API.list('areas', {
                        job: $stateParams.jobId
                    }).then(areas.get.success, areas.get.error);
    };

    areas.get = {
        success: function(res) {

            areas.data = res.data;
            console.log('areas.data is; ',areas.data);
        },
        error: function(err) {
            console.error(err);
        }
    };


    areas.setActiveArea= function(index){
        $rootScope.activeArea = areas.data[index];
    };

    areas.data = {};

    $ionicModal.fromTemplateUrl('templates/create-area.html')
        .then(function(modal) {
              areas.modal = modal;
    });

    areas.closeCreateNewArea = function() {
      areas.modal.hide();
    };

    areas.OpenCreateNewArea = function() {
      areas.modal.show();
    };

    // Perform the login action when the user submits the login form
    areas.createNewArea = function() {
      console.log('Creating Area: ', areas.data);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        areas.closeCreateNewArea();
      }, 1000);
    };

}
]);
