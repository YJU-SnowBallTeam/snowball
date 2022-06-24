const express = require("express");
const Girugi = require('../models/user');
const Board = require("../models/board");
const Comment = require("../models/comment");
const Notice = require("../models/notice");
const Faq = require("../models/faq");
const router = express.Router();
const moment = require("moment");
const { now } = require("moment");
// 로그인 확인용 변수
// let IsLogined;

// GET / POST 라우터
router
  .route("/")
  .get(async (req, res) => {
    try {
      const user = await req.session.IsLogined;
      console.log("get 요청 : ", user);
      res.render("MainPage/ALP1.html", { user });
    } catch (error) {
      console.error(error);
    }
  });

// =============================================================================================================================


router.get('/History', (req, res) =>{
  res.render('History/HistoryPage')
})

// =============================================================================================================================



// 체크 해볼 부분임 ================================================================
router.get("/Schedule", (req, res) => {
  res.render("Schedule/Schedule");
});

router.get("/login/register", (req, res) => {
  res.render("Register/signup");
});

router.get("/gongji", (req, res) => {
  res.render("Gongji/gongji");
});

router.get("/gongji/writePage", (req, res) => {
  res.render("writePage/writePage");
});

router.get("/profile", (req, res) => {
  const user = req.session.IsLogined;
  res.render("profile/profile", {user});
});


router.get('/girugi',async (req,res) => {
    console.log('실행');
    const user = await Girugi.findAll({
      where : {
        grade : 2
      }
    })
      console.log("유저는 :",user);
    res.render("jowon/jowon" , {user});
}
)


module.exports = router;
//  ================================================================ 체크 해볼 부분임

