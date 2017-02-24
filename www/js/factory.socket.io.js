// (function() {
//     App.factory('factory.socket.io', socketFactory);
//
//     socketFactory.$inject = ['$rootScope', '$window'];
//
//     function socketFactory($rootScope, $window) {
//         $window.socket = io.connect();
//
//         return {
//             on: function (eventName, callback) {
//                 $window.socket.on(eventName, function() {
//                     var args = arguments;
//                     $rootScope.$apply(function() {
//                         callback.apply($window.socket, args);
//                     });
//                 });
//             },
//             // emit: $window.socket.emit.bind($window.socket)
//             emit: function (eventName, data, callback) {
//                 $window.socket.emit(eventName, data, function() {
//                     var args = arguments;
//                     $rootScope.$apply(function() {
//                         if (callback && callback.constructor === Function) {
//                             callback.apply($window.socket, args);
//                         }
//                     });
//                 });
//             }
//         }
//     }
// })();
