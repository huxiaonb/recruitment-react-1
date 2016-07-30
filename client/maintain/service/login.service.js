/**
 * Created by HUGO on 6/29/2016.
 */
angular.module('backendMaintain').factory('loginServ', ['$rootScope','$location','$cookies','$window', '$http', function($rootScope, $location, $cookies, $window, $http){
    return {
        login : login
    };
    function login(userId,password,callback){
        var user={
            userid:userId,
            password:password
        }
        $http.post('/api/user/login', user).success(function (data) {
            if(data!=null){
                var date = new Date();
                date.setMinutes(date.getMinutes()+120);
                $cookies.put('USER_ID','true',{'expires':date});
                callback();
            }
            //else{
            //    $http.post('/api/v1/loginuser', user).success(function(data){
            //        console.log('init success');
            //    }).error(function(){
            //        console.log('error');
            //    })
            //}

        }).error(function () {
            console.log('login error');
        });

    }
}]);
