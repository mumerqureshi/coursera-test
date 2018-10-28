(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;
  list.searchTerm = "";
  list.found = [];
  list.empty = false;

  list.searchMenuItems = function () {
    var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
    promise.then(function (response) {
      list.found = response;
      list.empty = MenuSearchService.isEmpty();
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  list.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'searchTerms.html',
    scope: {
      found: '<',
      onRemove: '&',
      empty: '<'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController(){
  var list = this;
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    .then(function(response){
      foundItems = searchTearmOnArray(
        searchTerm.toLowerCase(),
        response.data["menu_items"]
      );
      return foundItems;
    });
  };

  service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex, 1);
  };

  service.isEmpty = function(){
    return (foundItems.length == 0);
  };

  function searchTearmOnArray(enteredText, arrayOfItem){
    if (enteredText != ""){
      return itemsThatMatchedTerm(enteredText, arrayOfItem);
    }
    return [];
  }

  function itemsThatMatchedTerm(enteredText, arrayOfItem){
    var arrayOfMatchedItem = [];
    for (var i = 0; i < arrayOfItem.length; i++) {
      if (arrayOfItem[i].description.includes(enteredText)){
        arrayOfMatchedItem.push(arrayOfItem[i]);
      }
    }
    return arrayOfMatchedItem;
  }

}

})();
