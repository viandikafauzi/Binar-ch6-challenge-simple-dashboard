const express = require("express");
const router = express.Router();
const db = require("./../../models");
const { v4: uuidv4 } = require("uuid");

router.post("/", (req, res) => {
  console.log(req);
  db.User.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((deletedUser) => {
      if (!deletedUser) {
        res.render("failed");
      }

      deletedUser
        .destroy()
        .then(res.render("success"))
        .catch((e) => res.render("failed"));
    })
    .catch((err) => res.render("failed"));
});

module.exports = router;
