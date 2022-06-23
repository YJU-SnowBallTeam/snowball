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
  // .post(async (req, res) => {
  //   console.log("req.method", req.method);
  //   console.log("post.(/)의 IsLogined", IsLogined);
  //   req.session.IsLogined = IsLogined;
  //   console.log("post.(/)의 req session", req.session);
  //   return res.send(req.session);
  // }) 없어도 잘 돌아가는 거 같음.(post 요청이 없음.)
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


router.get("/Notice", async (req, res, next) => {
  const user = await req.session.IsLogined;
  const notices = await Notice.findAll({
    order: [["post_id", "DESC"]],
    offset: 0,
  });
  notices.forEach((el) => {
    el.dataValues.date = moment(el.dataValues.date).format("YYYY-MM-DD");
  });
  console.log(notices);
  res.render("Notice/notice", { notices, user });
});

// 공지사항 작성창
router.get("/notice-add", (req, res) => {
  const user = req.session.IsLogined;
  res.render("Notice/notice-add", { user });
});

// 공지사항 작성
router.post("/Notice", async (req, res, next) => {
  try {
    let body = req.body;
    console.log("body 는",body);
    await Notice.create({
      title: body.inputTitle,
      content: body.inputContent,
      noticer: body.inputWriter,
    });
    console.log(body);
    res.redirect("/Notice");
  } catch (err) {
    next("에러는 : ",err);
  }
});

// 공지사항 상세페이지
router.get("/Notice/:postId", async (req, res, next) => {
  try {
    const user = await req.session.IsLogined;
    const { postId } = req.params;
    const notice = await Notice.findOne({ where: { post_id: postId } });
    res.render("Notice/notice-detail", { notice, user });
  } catch (err) {
    // error 처리
    next(err);
  }
});

// 공지사항 업데이트 작성창
router.get("/Notice/update/:postId", async (req, res, next) => {
  const user = await req.session.IsLogined;
  const { postId } = req.params;
  const notice = await Notice.findOne({ where: { post_id: postId } });
  res.render("Notice/notice-update", { notice, user });
});

// 공지사항 업데이트
router.put("/Notice/update/:postId", async (req, res, next) => {
  try {
    let body = req.body;
    console.log("=========================");
    console.log(body);
    console.log(body.inputContent);
    console.log("=========================");
    await Notice.update(
      {
        //   post_id: this.post_id,
        title: body.inputTitle,
        content: body.inputContent,
        boarder: body.inputWriter,
        //   date: now,
      },
      {
        where: { post_id: req.params.postId },
      }
    );
    res.redirect("/Notice/" + req.params.postId);
    return res.status(200).send("success");
  } catch (err) {
    next(err);
  }
});

// 공지사항 삭제
router.delete("/Notice/delete/:postId", async (req, res, next) => {
  const { postId } = req.params;
  console.log("====================");
  console.log(postId);
  console.log("====================");
  const notice = await Notice.destroy({ where: { post_id: postId } });
  return res.send("success");
});


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

router.route('/jowon').get( async (req, res)=>{
      await res.redirect('/girugi')
    }
)

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

