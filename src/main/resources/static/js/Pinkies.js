var app = angular.module('Pinkies', ['ngMaterial', 'ngSanitize', 'ngCsv', 'ngMessages', 'ngRoute', "materialCalendar"]);

app.config(function ($httpProvider, $mdThemingProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $mdThemingProvider.theme('default').primaryPalette('pink', {
    'default': '100', 'hue-1': 'A100', 'hue-2': 'A100', 'hue-3': 'A100',}).accentPalette('pink').backgroundPalette('grey');
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

   cards.newSubject = {



   };

   $http.get('/cs480/getId/' + "adrian").success(function (response) {
        cards.subjects = response;
   });


   //cards.exampleSubject = {date: "11", subjectName: "CS 431", cardText: "HELLO"};

   $http.put("/cs480/putId/" + "adrian", cards.exampleSubject).success( function(response){});

// CALENDAR CONTROLLER



}]);


//CALENDAR API

app.controller("calendarCtrl", function($scope, $filter, $http, $q) {

    $scope.user = "User: PINKIES"
    $scope.dayFormat = "dd";
    $scope.currentDate = "";

        $scope.newSubject = {
            date: null,
            subjectName: null,
            cardText: null,
        };

        $scope.addSubject = [];

    // To select a single date, make sure the ngModel is not an array.
    $scope.selectedDate = null;

    // If you want multi-date select, initialize it as an array.
    $scope.selectedDate = [];

    $scope.firstDayOfWeek = 0; // First day of the week, 0 for Sunday, 1 for Monday, etc.
    $scope.setDirection = function(direction) {
      $scope.direction = direction;
      $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    $scope.dayClick = function(date) {
      $scope.msg = "You clicked " + $filter("date")(date, "MM/d/y");
      $scope.dateSelected = $filter("date")(date, "y-MM-dd");
      $scope.newSubject.date = $filter("date")(date, "y-MM-dd");
      $scope.currentDate = $filter("date")(date, "y-MM-dd");
        $http.get("/cs480/getDate/" + "adrian" + "/" + $scope.dateSelected).success(function(response){
                $scope.allSubjects = response;
        })

    };

    $scope.addNewSubject=function() {
        $http.put("/cs480/putId/" + "adrian", $scope.newSubject).success(function(response){
            $http.get("/cs480/getDate/" + "adrian" + "/" + $scope.currentDate).success(function(response){
                    $scope.allSubjects = response;
            });
        });
    };

    //      $scope.exampleSubject = {date: $scope.dateSelected, subjectName: "CS 599", cardText: "HELLO"};
    //      $http.put("/cs480/putId/" + "adrian", $scope.exampleSubject).success(function(response){});

    $scope.day = $scope.msg;

    $scope.prevMonth = function(data) {
      $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };

    $scope.nextMonth = function(data) {
      $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };

    $scope.tooltips = true;
    $scope.setDayContent = function(date) {

        // You would inject any HTML you wanted for
        // that particular date here.
        return "<p></p>";

        // You could also use an $http function directly.
        return $http.get("/some/external/api");

        // You could also use a promise.
        var deferred = $q.defer();
        $timeout(function() {
            deferred.resolve("<p></p>");
        }, 1000);
        return deferred.promise;

    };

    $scope.deleteSubject = function(id) {
        $http.delete('/cs480/deleteCard/' + id).success(function(response){
            $http.get('/cs480/getId/' + 'adrian').success(function(response){
                $scope.allSubjects = response;
            });
       });
    };

    $scope.addCard = function(newName, date, newText) {
        $scope.addSubject.push({
                   date: date,
                   subjectName: newName,
                   cardText: newText,
       });
    };

    $scope.remove = function(card) {
        var index = $scope.addSubject.indexOf(card);
        $scope.addSubject.splice(index, 1);
    };


    $scope.pushCards=function() {
        $http.put("/cs480/putId/" + "adrian", $scope.newSubject).success(function(response){});
    };

    $scope.updateCard = function(subject) {
       $http.put("/cs480/updateCard/" + subject.id, subject).success(function (response){
            $http.get('/cs480/getId/' + 'adrian').success(function(response){});

       });

    };


//    $scope.enterSubject = "";
//    $scope.enterText = "";
//


});


