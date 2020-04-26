const db = require("../../data/dbConfig");

function find() {
  return db("recipes");
}
function findById(id) {
  return db("recipes").where({ id }).first();
}
function getStepId(id) {
  return db("steps").where({ id }).first();
}
function findIngrediantId(id) {
  return db("ingrediants").where({ id }).first();
}

function findFavId(id) {
  return db("user_recipe_favorites").where({ id }).first();
}

function findSteps(recipe_id) {
  return db("steps as st")
    .join("recipes as r", "st.recipe_id", "r.id")
    .select("st.instructions", "st.step_number")
    .where({ recipe_id });
}

function getIngrediantList(recipe_id) {
  return db("ingrediants as i")
    .join("recipes as r", "i.recipe_id", "r.id")
    .select("i.ingrediant_name", "i.quantity")
    .where({ recipe_id });
}
function getFavoriteList(user_id) {
  return db("recipes as r")
    .select("r.recipe_name", "r.description", "r.image_url")
    .join("user_recipe_favorites as f", "f.recipes_id", "=", "r.id")
    .where({ "f.user_id": user_id });
}

function add(recipe) {
  return db("recipes")
    .insert(recipe)
    .then((ids) => {
      const [id] = ids;

      return findById(id);
    });
}
function addStep(step) {
  return db("steps")
    .insert(step)
    .then((ids) => {
      return getStepId(ids[0]);
    });
}

function addIngrediant(ingrediant) {
  return db("ingrediants")
    .insert(ingrediant)
    .then((ids) => {
      return findIngrediantId(ids[0]);
    });
}

function addFavorite(fav) {
  return db("user_recipe_favorites")
    .insert(fav)
    .then((ids) => {
      return findFavId(ids[0]);
    });
}
function update(changes, id) {
  return db("recipes")
    .where({ id })
    .update(changes)
    .then(() => findById(id));
}

function updateSteps(changes, id) {
  return db("steps")
    .where({ id })
    .update(changes)
    .then(() => getStepId(id));
}

function updateIngrediants(changes, id) {
  return db("ingrediants")
    .where({ id })
    .update(changes)
    .then(() => findIngrediantId(id));
}

function remove(id) {
  return db("recipes").where("id", id).del();
}

function removeStep(id) {
  return db("steps").where("id", id).del();
}

function removeIngrediant(id) {
  return db("ingrediants").where("id", id).del();
}

module.exports = {
  find,
  findById,
  findSteps,
  findIngrediantId,
  getIngrediantList,
  getFavoriteList,
  add,
  addStep,
  addIngrediant,
  addFavorite,
  update,
  updateSteps,
  updateIngrediants,
  remove,
  removeStep,
  removeIngrediant,
};
