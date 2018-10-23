(function () {
'use strict';
angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

        function ToBuyController(ShoppingListCheckOffService) {
            var listOfItemsToBuy = this;

            listOfItemsToBuy.items = ShoppingListCheckOffService.getItemsToBuy();

            listOfItemsToBuy.buyItem = function(itemIndex) {
                ShoppingListCheckOffService.buyItem(itemIndex);
            };
        }

        AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

           function AlreadyBoughtController(ShoppingListCheckOffService) {
               var alreadyBougthList = this;

               alreadyBougthList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
           }

           function ShoppingListCheckOffService() {
               var service = this;
               var itemstoBuy = [
                   { name: "cookies", quantity: 10 },
                   { name: "jams", quantity: 2 },
                   { name: "butter", quantity: 6 },
                   { name: "honey", quantity: 4 },
                   { name: "fruits", quantity: 7 }
               ];
               var alreadyBoughtItems = [];

               service.buyItem = function(itemIndex) {
                   var item = itemstoBuy[itemIndex];

                   alreadyBoughtItems.push(item);
                   itemstoBuy.splice(itemIndex, 1);
               };

               service.getItemsToBuy = function() {
                   return itemstoBuy;
               };

               service.getAlreadyBoughtItems = function() {
                   return alreadyBoughtItems;
               };
           }
         })();
