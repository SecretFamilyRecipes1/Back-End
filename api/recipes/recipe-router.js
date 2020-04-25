const express = require("express");

const recipes = require("./recipe-model");

const router = express.Router();

router.get("/", (req, res) => {
  recipes
    .find()
    .then((recipe) => {
      res.json(recipe);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get recipes", err });
    });
});

router.get("/:id/steps", (req, res) => {
  recipes
    .findSteps(req.params.id)
    .then((steps) => {
      if (steps.length) {
        res.json(steps);
      } else {
        res.status(404).json({ msg: "could not find steps for recipe" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get steps", err });
    });
});

router.get("/:id/ingrediants", (req, res) => {
  recipes
    .getShoppingList(req.params.id)
    .then((list) => {
      if (list.length) {
        res.json(list);
      } else {
        res.status(404).json({ msg: "could not find ingrediants for recipe" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get ingrediants", err });
    });
});

module.exports = router;
