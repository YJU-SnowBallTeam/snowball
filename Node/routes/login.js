const express = require('express');
const { User } = require('../models');


const router = express.Router();


router.route('/')
  .post(
    async (req, res, next) => {
      try {
        console.log("받아온 바디 정보 : ", req.body);
        // view/login에서 axios.post(form Tag)한 정보가 들어옴
        console.log("받아온 요청 정보 : ", req.method);
        // SELECT * FROM user 
        // WHERE id = req.body.id
        // AND pw = req.body.pw 
        const user = await User.findOne({
          where: {
            id: req.body.id,
          }
        });
        if (user) {
          if (user.passwd == req.body.passwd) {
            await res.status(201).json(user)
            /* public/login/login.js(13줄)로 결과를 response해줌. */
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

router
  .route("/logined")
  .get((req, res) => {
    IsLogined = req.session.IsLogined;
    req.session.save(() => {
      console.log("세션 생성 완료");
      res.redirect("/");
    });
  })

  .post((req, res) => {
    IsLogined = req.body.user;
    req.session.IsLogined = IsLogined;
    console.log("/logined 의 post", IsLogined);
    console.log("post logined에서 받은 req.body", req.session.IsLogined);
    req.session.save(res.redirect("/"));
  });

router.get("/logout", (req, res) => {
  console.log("세션 삭제");
  IsLogined = null;
  req.session.IsLogined = null;

  console.log("/logout의 req.session", req.session);

  res.redirect("/");
});

module.exports = router;