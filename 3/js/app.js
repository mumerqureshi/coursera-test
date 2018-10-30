(function(){
  "use strict";
  angular.module("NarrowItDownApp",[])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService",MenuSearchService)
  .directive("foundItems", FoundItemsDirective)
  .constant("ApiAllItems", "https://davids-restaurant.herokuapp.com/menu_items.json");

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService){
    var ctrl = this;

    ctrl.found = [];

    ctrl.narrowDown = function(){
      if (MenuSearchService.AllItems.length==0){
        MenuSearchService.initItems().then(function(result){
          ctrl.found = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm===undefined?"":ctrl.searchTerm);
          //console.log(ctrl.found);
          ctrl.title = ctrl.found.length==0||ctrl.found==undefined||ctrl.searchTerm==""?"Nothing Found":ctrl.found.length+" item(s) found";
        });
      }else{
        ctrl.found = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm===undefined?"":ctrl.searchTerm);
        ctrl.title = ctrl.found.length==0||ctrl.found==undefined||ctrl.searchTerm==""?"Nothing Found":ctrl.found.length+" item(s) found";
      }
    };

    ctrl.onRemove = function(index){
      //console.log(ctrl.found[index]);
      ctrl.found.splice(index,1);
      ctrl.title = ctrl.found.length==0?"Nothing Found":ctrl.found.length+" item(s) found";
    };
  }

  MenuSearchService.$inject = ["$http", "ApiAllItems"];
  function MenuSearchService($http, ApiAllItems){
    var service = this;

    service.AllItems = [];

    service.initItems = function (){
      return $http({
        method: "GET",
        url: ApiAllItems
      }).then(function(response){
        service.AllItems = response.data["menu_items"];
      }).catch(function(error){console.log(error);});
    };

    service.getMatchedMenuItems = function (searchTerm){
      var result = [];
      if (searchTerm==""){
        return result;
      }
      for (var i=0; i<service.AllItems.length; i++){
        if (service.AllItems[i]['description'].toLowerCase().includes(searchTerm.toLowerCase())) {
          result.push(service.AllItems[i]);
        }
      }
      return result;
    }
  }

  function FoundItemsDirective(){
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope:{
        title:"=",
        found:"<foundItems",
        onRemove: "&"
      },
      controller: NarrowItDownController,
      controllerAs: 'ctrl',
      bindToController: true
    };
    return ddo;
  }


})();
