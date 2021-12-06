var app= angular.module('main', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: './components/home.html',
        controller: 'homeCtrl'
    }).when('/login', {
        templateUrl: './components/login.html',
        controller: 'loginCtrl'
    })
    .otherwise({
        template: '404'
    })
});
app.controller('homeCtrl', function($scope, $location){
    $scope.goToLogin = function(){
        $location.path('/login');
    };

});
app.controller('loginCtrl', function($scope, $http){
    $scope.login= function(){
        var userID= $scope.userID;
        var password = $scope.password;
        $http({
            url: 'http://localhost/Users/yusramunir/Desktop/webpage/server.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'userID=' +userID+ '&password=' +password
        }).then(function(response){
            console.log(response.data);
        })
    }
});