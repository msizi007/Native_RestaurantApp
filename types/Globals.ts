export const MENU_SIZE = 150;
export const burger = require("../assets/images/menu/burger_chips.png");
export const beverages = require("../assets/images/menu/beverages.png");
export const vegeterian = require("../assets/images/menu/vegeterian.png");
export const chicken = require("../assets/images/menu/chicken.png");
export const desserts = require("../assets/images/menu/desserts.png");
export const pizza = require("../assets/images/menu/pizza.png");
export const pizzaPromo = require("../assets/images/promo/double_pizza.jpg");

// items
export const iBurgerCombo = require("../assets/images/items/burgercombo.jpg");
export const iBurgerFriesDrinks = require("../assets/images/items/burgerfriesdrink.png");
export const iChickenNuggets = require("../assets/images/items/chickennuggets.png");
export const iCoke2L = require("../assets/images/items/coke_2l.png");
export const iPizzaCan = require("../assets/images/items/pizzacan.png");
export const iPizzaTop = require("../assets/images/items/pizzatop.png");
export const iAnyCan = require("../assets/images/items/anycan.png");

// menu
export const iPizza2 = require("../assets/images/items/pizza2.webp");
export const iWine1 = require("../assets/images/items/wine1.png");
export const iLargeBurger = require("../assets/images/items/largeburger.png");
export const iWolfLamb = require("../assets/images/items/wolflamb.webp");

export interface imagePayload {
  bucket: string;
  path: string;
}

export interface imageResponse {
  id: string;
  name: string;
  publicUrl: string;
  created_at: string;
  updated_at: string;
  last_accessed_at: string;
  metadata: any;
}
