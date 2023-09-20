const express = require("express");
const routes = express.Router();
require("../db/connect");
const Menu = require("../model/menuModel");

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Image");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("image");

routes.get("/", (req, res) => {
  res.send(
    "Welcome to your life. There is no turning back even when you sleep.. Okay"
  );
});

routes.post("/addItems", upload, async (req, res) => {
  const { name, description, price, mealTime, categoryInMealTime } = req.body;
  const image = req.file.filename;

  try {
    const menu = new Menu({
      name,
      description,
      image,
      price,
      mealTime,
      categoryInMealTime,
    });
    const menuAdder = await menu.save();

    if (menuAdder) {
      res.status(201).json({ message: "Menu added", data: menuAdder });
      console.log({
        name,
        description,
        image,
        price,
        mealTime,
        categoryInMealTime,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

routes.get("/getMenuItems", async (req, res) => {
  try {
    const menuItems = await Menu.find();
    const menuItemsWithImages = menuItems.map((item) => {
      return {
        _id: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: `${item.image}`,
        mealTime: item.mealTime,
        categoryInMealTime: item.categoryInMealTime,
      };
    });
    res.json(menuItemsWithImages);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

routes.get("/getMenuItemsByCategory/:category", async (req, res) => {
  const category = req.params.category;

  try {
    const menuItems = await Menu.find({ categoryInMealTime: category });
    const menuItemsWithImages = menuItems.map((item) => {
      return {
        _id: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: `${item.image}`,
        mealTime: item.mealTime,
        categoryInMealTime: item.categoryInMealTime,
      };
    });
    res.json(menuItemsWithImages);
  } catch (error) {
    console.error("Error fetching menu items by category:", error);
    res.status(500).json({ error: "Failed to fetch menu items by category" });
  }
});

module.exports = routes;
