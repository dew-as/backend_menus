const express = require("express");
const Menu = require("../models/Menu");
const router = express.Router();

// Get all menus
router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new menu
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newMenu = new Menu({ name, description, items: [] });
    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add an item to a menu
router.post("/:id/items", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ error: "Menu not found" });

    menu.items.push({ name, description, price });
    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific menu and its items
router.get("/:id", async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ error: "Menu not found" });

    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
