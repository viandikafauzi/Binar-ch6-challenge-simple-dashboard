const express = require("express");
const router = express.Router();
const db = require("./../../models");
const { v4: uuidv4 } = require("uuid");

router.post("/", (req, res) => {
  db.User.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((modifiedUser) => {
      if (!modifiedUser) {
        res.status(404).json({ msg: "No user defined!" });
      }

      modifiedUser.username = req.body.username || req.body.username;
      modifiedUser.password = req.body.password || req.body.password;

      modifiedUser
        .save()
        .then(res.render("success"))
        .catch((err) => res.render("failed"));
    })
    .catch((err) => res.render("failed"));
});

module.exports = router;
