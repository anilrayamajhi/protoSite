angular.module('myApp')
  .controller('mainController', mainController)
  .controller('loginController', loginController)
  .controller('logoutController', logoutController)
  .controller('registerController', registerController)
  .controller('pageController', pageController)
  .controller('singlePageController', singlePageController)
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
          // $state.go('cars')
      })
    }
}

function singlePageController($state, $http, $stateParams){
  var vm = this
  $http.get('api/pages/'+$stateParams.id)
    .success(function(page){
      vm.page = page;
    })

    vm.map;
    vm.getAddress = function() {
      vm.get('https://maps.googleapis.com/maps/api/geocode/json?address="6018 Dauphin St"')
      .success(function(data) {
        console.log("Latitude:", data.results[0].geometry.location.lat)
        console.log("Longitute:", data.results[0].geometry.location.lng)
        console.log("{{vm.page.location.coordinate}}");
        vm.geocodedAddress = data.results[0].geometry.location
        vm.myMap = new google.maps.Map(document.getElementById('map'), {
          vm.center: vm.geocodedAddress,
          vm.zoom: 17,
          vm.content: 'Ganey'
        });
        vm.marker = new google.maps.Marker({
          vm.position: vm.geocodedAddress,
          vm.map: vm.myMap,
        });
        vm.contentString = "<h1>Ganey's house</h1>"
        vm.infowindow = new google.maps.InfoWindow({
           vm.content: vm.contentString
         });
        marker.addListener('click', function() {
          vm.infowindow.open(vm.map, vm.marker);
    });
      })
    }
}
