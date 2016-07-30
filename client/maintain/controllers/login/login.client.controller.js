/**
 * Created by HUGO on 6/29/2016.
 */
angular.module('backendMaintain').controller('loginCtrl', ['$scope', '$http', 'loginServ', '$window', function ($scope, $http, loginServ, $window) {
    $scope.login = function(){
        if($scope.userId!=null && $scope.password!=null){
            loginServ.login($scope.userId.toLowerCase(),$scope.password,function(){
                //$state.go('home');
                $window.location.href="/back/home";
            });
        }
    }
}])
