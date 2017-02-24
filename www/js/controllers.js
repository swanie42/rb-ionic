var API_ENDPOINT = "//104.236.6.136";

angular.module('starter.controllers', ['ngRoute', 'ngFileUpload', 'ngCordova', 'ionic'])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $rootScope, $cordovaCamera) {
      console.log('app controller running');

      $http.post(API_ENDPOINT + '/login', {
        email: 'super@user.com',
        password: 'admin'
      }).then(function(res) {
        localStorage.setItem('token', res.data.token);
        console.log('the rezzzz: ', res);
      }, function(err) {
        console.log('this is an error: ', err);
      });

      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:
      //$scope.$on('$ionicView.enter', function(e) {
      //});
      $scope.takePhoto = function () {
                 var options = {
                   quality: 75,
                   destinationType: Camera.DestinationType.DATA_URL,
                   sourceType: Camera.PictureSourceType.CAMERA,
                   allowEdit: true,
                   encodingType: Camera.EncodingType.JPEG,
                   targetWidth: 300,
                   targetHeight: 300,
                   popoverOptions: CameraPopoverOptions,
                   saveToPhotoAlbum: false
               };

                   $cordovaCamera.getPicture(options).then(function (imageData) {
                       $scope.imgURI = "data:image/jpeg;base64," + imageData;
                   }, function (err) {
                       // An error occured. Show a message to the user
                   });
               }


// Form data for the login modal
$scope.loginData = {};

// Create the login modal that we will use later
$ionicModal.fromTemplateUrl('templates/login.html', {
  scope: $scope
}).then(function(modal) {
  $scope.modal = modal;
});

// Triggered in the login modal to close it
$scope.closeLogin = function() {
  $scope.modal.hide();
};

// Open the login modal
$scope.login = function() {
  $scope.modal.show();
};

// Perform the login action when the user submits the login form
$scope.doLogin = function() {
console.log('Doing login', $scope.loginData);

// Simulate a login delay. Remove this and replace with your login
// code if using a login system
$timeout(function() {
  $scope.closeLogin();
}, 1000);
};

})
.controller('CameraCtrl', function($scope, $cordovaFile, $ionicLoading, $cordovaSocialSharing, $ionicHistory, $ionicLoading) {

    $scope.$on("$ionicView.enter", function(event) {
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
    });

   // LOAD IMAGE FROM THE CAMERA
   $scope.takePhoto = function(type) {

		var image = new Image();

		if ( type == "Camera" )
			type = navigator.camera.PictureSourceType.CAMERA ;
		else type = navigator.camera.PictureSourceType.PHOTOLIBRARY ;

		navigator.camera.getPicture(function(imageURI) {

			 image.onload = function() {

				 $scope.imageSRC = image ;

				  var canvas =  document.getElementById('myCanvas');
				  canvas.width = image.width;
				  canvas.height = image.height;

				  var ctx = canvas.getContext("2d");
				  ctx.drawImage(image, 0,0, image.width,image.height); // DRAW THE IMAGE ONTO CANVAS

				  // READING METADATA FROM IMAGE
				  EXIF.getData(image, function() {
					console.log("in exif " +  JSON.stringify(this));
					});

				$scope.cleanUp(); // CLEAN UP IMAGES TAKEN
			};

			image.src = imageURI ; // LOAD THE IMAGE OBJECT

			}, function(message) { //ERROR HANDLER
				console.log("error " + message);

			}, { // CAMERA OPTIONS
				quality:50,
				sourceType: type,
				encodingType: Camera.EncodingType.JPEG,
				correctOrientation: true,
				destinationType: Camera.DestinationType.FILE_URI
			});
}

	$scope.cleanUp = function(){ // CLEAN UP PHOTOS TAKEN

		navigator.camera.cleanup(onSuccess, onFail);

			function onSuccess() {
				console.log("Camera cleanup success.")
			}

			function onFail(message) {
				alert('Failed because: ' + message);
			}
	}


  // ROTATE IMAGE FUNCTION
  $scope.rotateImage = function(degree){

     $ionicLoading.show({
            template: 'Working...'
      });

      // DEPENDING ON THE SIZE OF THE IMAGE, THE ROTATION CAN ALSO BE CPU HEAVY
      // BECAUSE IT NEEDS TO REDRAW THE IMAGE

      setTimeout( function() { // SET A TIMEOUT SO THAT THE LOADING POPUP CAN BE SHOWN

		  var image = $scope.imageSRC ;

		  image.onload = null ; // remove the onload handler

		  var canvas =  document.getElementById('myCanvas');

		  // swap the width and height for 90 degree rotation
		  canvas.width = image.height;
		  canvas.height = image.width;

		  var ctx = canvas.getContext("2d");

		  // translate context to center of canvas
		  ctx.translate(image.height / 2, image.width / 2);
		  ctx.rotate((Math.PI/180) * degree); // rotate image

		  // draw the new rotated image
		  ctx.drawImage(image, - image.width / 2, - image.height / 2, image.width, image.height);

		  $scope.imageSRC.src = canvas.toDataURL(); // save the new original image

      }, 100);

      setTimeout( function() {$ionicLoading.hide();},100); // HIDE THE POPUP AFTER IT'S DONE
  }

  // SHARE OR SAVE PHOTO FUNCTION
  $scope.sharePhoto = function(){

  	if ( ionic.Platform.isAndroid() ) { // SAVE FOR ANDROID
  	   window.canvas2ImagePlugin.saveImageDataToLibrary(
                        function(msg){
                            alert("Photo Saved!");
                        },
                        function(err){
                            alert(err);
                        },
                        'myCanvas'
                    );
	}
	else{ // SHARE SHEET WORKS FOR IOS ONLY

  	    var canvas =  document.getElementById('myCanvas');
	  	var dataURL = canvas.toDataURL();

		$cordovaSocialSharing
			.share("title", "message", dataURL, "link") // Share via native share sheet
			.then(function(result) {
				// Success!
			}, function(err) {
			  // An error occured. Show a message to the user
		  	});
  		}
	}
});
