const express = require("express");

const recipes = require("./recipe-model");

const router = express.Router();
//get requests//

router.get("/", (req, res) => {
  recipes
    .find()
    .then((rec) => {
      res.json({
        recipe: rec,
        step: rec.forEach((r) => {
          let result = async () => {
            const answer = await recipes.findSteps(r.id);
            console.log(answer);
            return answer;
          };
          r.steps = result();
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get recipes", err });
    });
});

router.get("/:id", (req, res) => {
  recipes
    .findById(req.params.id)
    .then((recipe) => {
      recipe
        ? res.json(recipe)
        : res.status(404).json({ msg: "could not find specified recipe" });
    })
    .catch((err) => {
      res.status(500).json({ msg: "server failed to get recipe", err });
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
    .getIngrediantList(req.params.id)
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
router.get("/:id/favorites", (req, res) => {
  recipes
    .getFavoriteList(req.params.id)
    .then((list) => {
      if (list.length) {
        res.json(list);
      } else {
        res.status(404).json({ msg: "could not find favorites for user" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Server failed to get favorites list", err });
    });
});
//post requests

router.post("/add_recipe", (req, res) => {
  recipes
    .add(req.body)
    .then((recipe) => {
      res.json(recipe);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "server error, failed to add recipe", err });
    });
});

router.post("/add_steps", (req, res) => {
  recipes
    .addStep(req.body)
    .then((step) => {
      step
        ? res.json(step)
        : res.status(404).json({ msg: "could not find step to add" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "server error, failed to add step", err });
    });
});

router.post("/add_ingrediant", (req, res) => {
  recipes
    .addIngrediant(req.body)
    .then((ing) => {
      ing
        ? res.json(ing)
        : res.status(404).json({ msg: "could not find ingrediant to add" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "server error, failed to add ingrediant", err });
    });
});

router.post("/add_fav", (req, res) => {
  recipes
    .addFavorite(req.body)
    .then((fav) => {
      fav
        ? res.status(200).json({ msg: "added to favorites" })
        : res.status(404).json({ msg: "could not find recipe to add" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error, failed to add recipe to favorites",
        err,
      });
    });
});

//put requests

router.put("/:id", (req, res) => {
  recipes
    .update(req.body, req.params.id)
    .then((updated) => {
      res.status(200).json({ msg: "update successful", updated: updated });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "An error occured while updating recipe", err });
    });
});

router.put("/edit_steps/:id", (req, res) => {
  recipes
    .updateSteps(req.body, req.params.id)
    .then((updated) => {
      res.status(200).json({ msg: "updated steps", updated: updated });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "An error occured while updating steps", err });
    });
});

router.put("/edit_ingrediants/:id", (req, res) => {
  recipes
    .updateIngrediants(req.body, req.params.id)
    .then((updated) => {
      res.status(200).json({ msg: "updated ingrediant(s)", updated: updated });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "An error occured while updating ingrediant(s)", err });
    });
});

//delete requests
router.delete("/:id", (req, res) => {
  recipes
    .remove(req.params.id)
    .then((deleted) => {
      deleted
        ? res.json({ removed: deleted })
        : res
            .status(404)
            .json({ message: "Could not find recipe with given id" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete recipe", err });
    });
});

router.delete("delete_step/:id", (req, res) => {
  recipes
    .removeStep(req.params.id)
    .then((deleted) => {
      deleted
        ? res.json({ removed: deleted })
        : res
            .status(404)
            .json({ message: "Could not find recipe step with given id" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete step", err });
    });
});

router.delete("delete_ingrediant/:id", (req, res) => {
  recipes
    .removeIngrediant(req.params.id)
    .then((deleted) => {
      deleted
        ? res.json({ removed: deleted })
        : res
            .status(404)
            .json({ message: "Could not find ingrediant with given id" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete ingrediant", err });
    });
});

module.exports = router;
