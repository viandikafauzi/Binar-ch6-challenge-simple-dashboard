const express = require("express");
const router = express.Router();
const db = require("./../../models");
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res) => {
  db.User.findAll({
    include: [db.Profile, db.History],
    order: ["createdAt"],
  })
    .then((allUser) => {
      res.render("user/view", { data: allUser });
    })
    .catch((err) => res.render("failed"));
});

router.post("/", (req, res) => {
  db.User.create({
    id: uuidv4(),
    username: req.body.username,
    password: req.body.password,
  })
    .then(res.render("success"))
    .catch((err) => res.status(400).json({ msg: err.message }));
});

module.exports = router;
