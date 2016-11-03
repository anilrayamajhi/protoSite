angular.module('myApp')
  .controller('mainController', mainController)
  .controller('loginController', loginController)
  .controller('logoutController', logoutController)
  .controller('registerController', registerController)
  .controller('pageController', pageController)
  .controller('singlePageController', singlePageController)
  .filter('tel', tel)
  // .filter('pageFilter', pageFilter)


  mainController.$inject = ['$rootScope', '$state', 'AuthService']
  loginController.$inject = ['$state', 'AuthService']
  logoutController.$inject = ['$state', 'AuthService']
  registerController.$inject = ['$state', 'AuthService']
  pageController.$inject = ['$state', '$http']
  singlePageController.$inject = ['$state', '$http', '$stateParams']


function mainController($rootScope, $state, AuthService) {
  var vm = this
  $rootScope.$on('$stateChangeStart', function (event) {
    // console.log("Changing states")
    AuthService.getUserStatus()
      .then(function(data){
        vm.currentUser = data.data.user
        console.log(data.data.user);
      })
  })
}

// LOGIN CONTROLLER:
function loginController($state, AuthService) {
  var vm = this
  vm.login = function () {

    // initial values
    vm.error = false
    vm.disabled = true

    // call login from service
    AuthService.login(vm.loginForm.username, vm.loginForm.password)
      // handle success
      .then(function () {
        console.log("Successful login...")
        $state.go('profile')
        vm.disabled = false
        vm.loginForm = {}
      })
      // handle error
      .catch(function () {
        console.log("Whoops...")
        vm.error = true
        vm.errorMessage = "Invalid username and/or password"
        vm.disabled = false
        vm.loginForm = {}
      })
  }
}


// LOGOUT CONTROLLER:
function logoutController($state, AuthService) {
  var vm = this
  vm.logout = function () {

    // call logout from service
    AuthService.logout()
      .then(function () {
        $state.go('login')
      })
  }
}

// REGISTER CONTROLLER:
function registerController($state, AuthService) {
  var vm = this
  vm.register = function () {

    // initial values
    vm.error = false
    vm.disabled = true

    // call register from service
    AuthService.register(vm.registerForm.username, vm.registerForm.password)
      // handle success
      .then(function () {
        $state.go('profile')
        vm.disabled = false
        vm.registerForm = {}
      })
      // handle error
      .catch(function () {
        vm.error = true
        vm.errorMessage = "Something went wrong!"
        vm.disabled = false
        vm.registerForm = {}
      })
  }
}

function pageController($state, $http){
  var vm = this

  $http.get('/api/pages')
    .success(function(data) {
      console.log(data);
      vm.pages = data
    })

  vm.createPage = function() {
    $http.post('/api/pages', vm.newPage)
      .success(function(data) {
          console.log(data);
      })
    }
    $state.go('profile');
}

function singlePageController($state, $http, $stateParams){
  var vm = this
  $http.get('api/pages/'+$stateParams.id)
    .success(function(page){
      vm.page = page;
      vm.id = $stateParams.id;
    })
}

function tel(){
return function (tel) {
   if (!tel) { return ''; }

   var value = tel.toString().trim().replace(/^\+/, '');

   if (value.match(/[^0-9]/)) {
       return tel;
   }

   var country, city, number;

   switch (value.length) {
       case 10:
           country = 1;
           city = value.slice(0, 3);
           number = value.slice(3);
           break;

       case 11:
           country = value[0];
           city = value.slice(1, 4);
           number = value.slice(4);
           break;

       case 12:
           country = value.slice(0, 3);
           city = value.slice(3, 5);
           number = value.slice(5);
           break;

       default:
           return tel;
   }

   if (country == 1) {
       country = "";
   }

   number = number.slice(0, 3) + '-' + number.slice(3);

   return (country + " (" + city + ") " + number).trim();
};
};
