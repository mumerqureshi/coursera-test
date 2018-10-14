(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
$scope.message = "";
$scope.enteredDishes ="";

$scope.CheckEnteredList= function(){
$scope.message = "";
if($scope.enteredDishes == '')
  $scope.message = "Please enter data first";
else {
  var enteredDishesList = $scope.enteredDishes;
  var numberOfDishesEntered = enteredDishesList.split(",").length;
  if(numberOfDishesEntered >3){
    $scope.message = "Too much!";
  }
  else  {
    $scope.message = "Enjoy!";
        }
    }
};
} // End of the function, LunchCheckController($scope)

})();
