exports.up = function (knex) {
  return knex.schema
    .createTable("users", (users) => {
      users.increments();

      users.string("username", 255).notNullable().unique();
      users.string("password", 255).notNullable();
      users
        .integer("favorite_recipe_id")
        .unsigned()
        .notNullable()
        .references("recipes.id");
    })
    .createTable("recipes", (tbl) => {
      tbl.increments();
      tbl.integer("user_id").unsigned().notNullable().references("users.id");
      tbl.text("recipe_name", 128).notNullable();
      tbl.text("description", 800).notNullable();
      tbl.text("prep time", 128);
      tble.text("cook time", 128);
      tble.text("serving size", 128);
      tbl.string("image filepath", 255);
    })
    .createTable("ingrediants", (tbl) => {
      tbl.increments();
      tbl.text("ingrediant_name", 128).unique().notNullable();
      tbl.text("quantity");
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipes.id");
    })
    .createTable("steps", (tbl) => {
      tbl.increments();

      tbl.integer("step_number").unsigned().notNullable();
      tbl.text("instructions").notNullable();
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipes.id");

      tbl
        .integer("ingrediants_id")
        .unsigned()
        .notNullable()
        .references("ingrediants.id");
    })
    .createTable("user_recipe_ratings", (tbl) => {
      tbl.increments();
      tbl
        .integer("recipes_id")
        .unsigned()
        .notNullable()
        .references("recipes.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl.integer("rating").unsigned().notNullable();

      tbl.unique(["recipes_id", "user_id"]);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
