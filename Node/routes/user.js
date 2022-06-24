const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll();

      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    const { passwd } = req.body;
    const hash = await bcrypt.hash(passwd,12);
    
    try {
      const user = await User.create({
        id: req.body.id,
        passwd: hash,
        name: req.body.name,
        tel: req.body.tel,
        email: req.body.email,
        grade: req.body.grade,
        yjuclass: req.body.yjuclass,
      });

      console.log("등록된 유저명 : ", user);
      await res.status(201).json(user);
    } catch (err) {
      res.send(false);
      console.error(err);
      next(err);
    }
  });


module.exports = router;
