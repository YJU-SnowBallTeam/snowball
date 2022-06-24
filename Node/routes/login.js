const express = require('express');
const { User } = require('../models');
const bcrypt = require("bcrypt");

const router = express.Router();


router.route('/')
  .post(
    async (req, res, next) => {
      try {
        const user = await User.findOne({
          where: {
            id: req.body.id,
          }
        });
        console.log(req.body.passwd);
      
        console.log("userpasswd",user.passwd);
        const check = await bcrypt.compare(req.body.passwd, user.passwd)
      
        if (user) {
          if (check) {
            req.session.IsLogined = user;
            await res.status(201).json(user)
          } else {
            res.send("falsed");
          }
        } else {
          res.send(false);
        }

      } catch (err) {
        console.error(err);
        next(err);
      }
    }
  )
  .get((req, res) => {
    res.render("login/login.html", { title: "Express" });
  });



router.get("/register", (req, res) => {
  res.render("Register/signup");
});

// router
//   .route("/logined")
//   .get((req, res) => {
//     // req.session.save(() => {
//     //   res.redirect("/");
//     // });
//     res.redirect("/");
//   })

router.get("/logout", (req, res) => {
  req.session.destroy( err => {
    if(err) throw err;
    res.redirect("/");
  });
});

module.exports = router;