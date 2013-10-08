
angular.module('accountsCtrls', ['django_constants', 'commonSrvs', 'commonDirectives'])
  .controller('LoginCtrl', ['$scope', '$http', 'django', 'MessageSrv', 
                                 function($scope, $http, django, MessageSrv){

    $scope.login = function() {
      
      var loginData = {"username": $scope.username, "password": $scope.password};
      $http.post(django.urls.login, loginData)
        .success(function(data){
          window.location = "/";
        })
        .error(function(messages){
          MessageSrv.setMessages(messages, "error");
        });
    };

    $scope.logout = function() {
      
      var loginData = {"username": $scope.username, "password": $scope.password};
      $http.post(django.urls.logout, {})
        .success(function(data){
          window.location = "/";
        })
        .error(function(messages){
          MessageSrv.setMessages(messages, "error");
        });
    };


  }])
  .controller('RegisterCtrl', ['$scope', '$http', 'django', 'MessageSrv', 
                                 function($scope, $http, django, MessageSrv){

    $scope.submit = function() {

      var registerData = {"register": $scope.register,
                          "recaptcha": vcRecaptchaService.data()};

      $http.post(django.urls.register, registerData)
        .success(function(data){
          MessageSrv.setMessages("You've registered as " + data.username 
                                 + ". Please, login.", "success");
        })
        .error(function(messages){
          MessageSrv.setMessages(messages, "error");
          // In case of a failed validation you need to reload the
          // captcha because each challenge can be checked just once
          // vcRecaptchaService.reload();
        });
    };

  }]);
