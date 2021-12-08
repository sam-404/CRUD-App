var app= angular.module('main', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: './components/home.html',
        controller: 'homeCtrl'
    }).when('/login', {
		templateUrl: './components/login.html',
		controller: 'loginCtrl'
    }).when('/loginStudent', {
        templateUrl: './components/loginStudent.html',
        controller: 'loginStudentCtrl'
    }).when('/dashboard', {
        templateUrl: './components/dashboard.html',
        controller: 'dashboardCtrl' 
    }).when('/dashboardStudent', {
        templateUrl: './components/dashboardStudent.html',
        controller: 'dashboardStudentCtrl' 
    })
    .otherwise({
        template: '404'
    })
});

app.service('user', function(){
    var userID;
    var loggedin;
    this.setID = function(ID) {
        userID=ID;
    };
    this.getID = function(){
        return ID;
    };
    this.idUserLoggenIn = function() {
        return loggedin;
    };
    this.userLoggedIn = function(){
        loggedin = true;
    }
})
app.service('userStudent', function(){
    var userIDStudent;
    var Studentloggedin;
    this.setStudentID = function(ID) {
        userIDStudent=ID;
    };
    this.getStudentID = function(){
        return ID;
    };
    this.idUserStudentLoggenIn = function() {
        return Studentloggedin;
    };
    this.userStudentLoggedIn = function(){
        Studentloggedin = true;
    }
})

app.controller('homeCtrl', function($scope, $location){
    $scope.goToLogin = function(){
        $location.path('/login');
    };
    $scope.goToLoginStudent = function(){
        $location.path('/loginStudent');
    };

});

app.controller('loginCtrl', function($scope, $http, user){
    $scope.login= function(){
        var userID= $scope.userID;
        var password = $scope.password;
        $http({
            url: 'http://localhost:8070/angulajs-mysql/server.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'userID=' +userID+ '& password=' +password
        }).then(function(response){
            if(response.data.status == 'loggedin') {
                user.userLoggedIn();
                user.setID(response.data.user);
                $location.path('/dashboard');
            }else {
                alert('invalid login');
            }
        })
    }
});

app.controller('loginStudentCtrl', function($scope, $http, userStudent){
    $scope.loginStudent= function(){
        var userIDStudent= $scope.userIDStudent;
        var StudentPassword = $scope.Studentpassword;
        $http({
            url: 'http://localhost/angulajs-mysql/server.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'userID=' +userIDStudent+ '& password=' + StudentPassword
        }).then(function(response){
            if(response.data.status == 'Studentloggedin') {
                userStudent.userStudentLoggedIn();
                userStudent.setStudentID(response.data.userStudent);
                $location.path('/dashboardStudent');
            }else {
                alert('invalid login');
            }
        })
    }
});
app.controller('dashboardCtrl', function($scope, user){
    $scope.user = user.getID();
});
app.controller('dashboardStudentCtrl', function($scope, user){
    $scope.user = user.getID();
});