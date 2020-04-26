const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  editUser,
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}
function findById(id) {
  return db("users").where({ id }).first();
}

function remove(id) {
  return db("users").where({ id }).del();
}

function editUser(changes, id) {
  return db("users")
    .where({ id })
    .update(changes)
    .then((id) => {
      return findById(id);
    });
}
