var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.json([
    { id: 18, productType: "Alcoholic Beverages" },
    { id: 24, productType: "Animal Feed" },
    { id: 25, productType: "Bakery Products" },
    { id: 7, productType: "Dairy Products" },
    { id: 8, productType: "Eggs" },
    { id: 9, productType: "Fats and Oils" },
    { id: 11, productType: "Fish, Crustaceans and Molluscs" },
    { id: 14, productType: "Fruit and Vegetables" },
    { id: 6, productType: "Grain and Starch Products" },
    { id: 13, productType: "Herbs and Spices" },
    { id: 10, productType: "Meat and Meat Products" },
    { id: 17, productType: "Non Alcoholic Beverages" },
    { id: 15, productType: "Nuts and Seeds" },
    { id: 19, productType: "Other" },
    { id: 26, productType: "Prepared Meals and Dishes" },
    { id: 21, productType: "Sugar and Chocolate Confectionery" },
    { id: 16, productType: "Sugar, Preserves and Snacks" },
    { id: 22, productType: "Take away food" },
  ]);
});

module.exports = router;
