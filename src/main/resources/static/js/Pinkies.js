var app = angular.module('Pinkies', ['ngMaterial', 'ngSanitize', 'ngCsv', 'ngMessages', 'ngRoute']);

app.config(function ($httpProvider, $mdThemingProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $mdThemingProvider.theme('default').primaryPalette('blue-grey').accentPalette('blue-grey').backgroundPalette('grey');
});

//Side Navigation Controller
app.controller('NavController', ['$mdSidenav', function ($mdSidenav) {

    this.sideNavTab = 'send_emails'

    this.selectNavTab = function (setTab)
    {
        this.sideNavTab = setTab;
    }
    this.isSelected = function (checkTab)
    {
        return this.sideNavTab === checkTab;
    }
    this.toggleSidenav = function (menuId)
    {
        $mdSidenav(menuId).toggle();
    };
}]);


app.controller('CardController', ['$mdSidenav', '$http', '$mdDialog', '$route', function CampaignController ($mdSidenav, $http, $mdDialog, $route) {

   cards = this;

   $http.get('/cs480/testing/').success(function (response) {
        cards.subjects = response;
   });



}]);


