var myApp=angular.module('myApp', ['ui.router', 'ui.bootstrap'])
  .directive('navigationBar', navigationBar)

myApp.config(function ($stateProvider, $urlRouterProvider) {

  // $locationProvider.html5Mode(true)

  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      restricted: true
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginController as loginCtrl'
    })
    .state('logout', {
      url: '/logout',
      controller: 'logoutController'
    })
    // .state('register', {
    //   url: '/register',
    //   templateUrl: 'templates/register.html',
    //   controller: 'registerController as registerCtrl'
    // })
    .state('page', {
      url: '/page/:id',
      templateUrl: 'templates/page.html',
      controller: 'singlePageController as singlePCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'templates/profile.html',
      controller: 'pageController as pageCtrl'
    })

})

myApp.run(function ($rootScope, $location, $state, AuthService) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    AuthService.getUserStatus()
    .then(function(){
      // console.log(toState)
      if (toState.restricted && !AuthService.isLoggedIn()){
        // $location.path('/login')
        $state.go('login');
      }
    })
  })
})


function navigationBar() {
  return {
    restrict: 'E',
    templateUrl: 'partials/nav.html'
  }
}
