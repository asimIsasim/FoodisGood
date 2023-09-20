const mongoose = require("mongoose");

const menuModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  mealTime: {
    type: String,
    required: true,
  },
  categoryInMealTime: {
    type: String,
    required: true,
  },
});

const Menu = mongoose.model("MENUITEM", menuModel);

module.exports = Menu;
