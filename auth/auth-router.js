const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../users/user-model");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then((saved) => {
      res.status(201).json(saved);
      console.log(saved);
    })
    .catch((error) => {
      res.status(500).json({ msg: "unable to register user", error });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const payload = {
          userId: user.id,
          userRole: "normal",
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        //res.cookie("token", token); //to send the token as cookie
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token: token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.delete("/delete_user/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((deleted) => {
      deleted
        ? res.json({ removed: deleted })
        : res
            .status(404)
            .json({ message: "Could not find user with given id" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete user", err });
    });
});

router.put("/edit_user/:id", (req, res) => {
  const { id } = req.params;
  let updatedUser = req.body;
  updatedUser.id = id;
  const hash = bcrypt.hashSync(updatedUser.password, 8);
  updatedUser.password = hash;
  Users.editUser(req.body, req.params.id)
    .then((updated) => {
      res.status(200).json({ msg: "update successful", updated });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "An error occured while updating account", err });
    });
});

module.exports = router;
