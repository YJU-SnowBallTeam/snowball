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
let IsLogined;

// GET / POST 라우터
router
  .route("/")
  .post(async (req, res) => {
    console.log("req.method", req.method);
    console.log("post.(/)의 IsLogined", IsLogined);
    req.session.IsLogined = IsLogined;
    console.log("post.(/)의 req session", req.session);
    return res.send(req.session);
  })
  .get(async (req, res) => {
    try {
      const user = await req.session.IsLogined;
      console.log("get 요청 : ", user);
      res.render("MainPage/ALP1.html", { user });
    } catch (error) {
      console.error(error);
    }
  });

router.get("/login", (req, res) => {
  res.render("login/login.html", { title: "Express" });
});

router.get("/logout", (req, res) => {
  console.log("세션 삭제");
  IsLogined = null;
  req.session.IsLogined = null;

  console.log("/logout의 req.session", req.session);

  res.redirect("/");
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


// =========================================================================================================================




// 커뮤니티 전체 리스트
router.get("/Community", async (req, res, next) => {
  const user = await req.session.IsLogined;
  const boarders = await Board.findAll({
    order: [["post_id", "DESC"]],
    offset: 0,
  });
  boarders.forEach((el) => {
    el.dataValues.date = moment(el.dataValues.date).format("YYYY-MM-DD");
  });
  res.render("Community/Community", { boarders, user });
});

// 커뮤니티 작성 창
router.get("/Community-add", (req, res) => {
  const user = req.session.IsLogined;
  res.render("Community/Community-add", { user });
});

// 커뮤니티 글 작성
router.post("/Community", async (req, res, next) => {
  try {
    let body = req.body;
    //  console.log(body);
    //  console.log(body.inputContent);
    await Board.create({
      title: body.inputTitle,
      content: body.inputContent,
      boarder: body.inputWriter,
    });
    res.redirect("/Community");
    //  return res.status(200).send("success");
  } catch (err) {
    next(err);
  }
});

// router.get("/products/:productId", shopController.getProduct);
// select
router.get("/Community/:postId", async (req, res, next) => {
  try {
    const user = await req.session.IsLogined;
    const { postId } = req.params;
    const board = await Board.findOne({ where: { post_id: postId } });
    //   밑에 날짜 처리하니 깨짐
    // console.log(Board.dataValues);
    // board.dataValues.date = moment(board.dataValues.date).format("YYYY-MM-DD");
    //   boarders.forEach((el) => {
    //     el.dataValues.date = moment(el.dataValues.date).format("YYYY-MM-DD");
    //   });
    const comments = await Comment.findAll({
      where: { post_id: postId },
      order: [["post_id", "DESC"]],
      offset: 0,
    });

    comments.forEach((el) => {
      el.dataValues.date = moment(el.dataValues.date).format("YYYY-MM-DD");
    });

    console.log(comments);
    res.render("Community/Community-detail", { board, comments, user });
  } catch (err) {
    next(err);
  }
  // error 처리
});

// detail - comment Insert
router.post("/Community/comment/:postId", async (req, res, next) => {
  try {
    let body = req.body;
    console.log("===================");
    console.log(req.params.postId);
    console.log("===================");
    console.log(body);
    //  console.log(body.inputContent);
    await Comment.create({
      post_id: req.params.postId,
      content: body.inputContent,
      // content: body.inputContent,
      commenter: body.inputCommentWriter,
    });
    // console.log("success");
    res.redirect("/Community/" + req.params.postId);
    // return res.status(200).send("success");
    // res.render("Community/Community/Community-detail");
  } catch (err) {
    next(err);
  }
});

// 업데이트 창 가져오기
router.get("/Community/:postId/update", async (req, res, next) => {
  const user = await req.session.IsLogined;
  const { postId } = req.params;
  const board = await Board.findOne({ where: { post_id: postId } });
  res.render("Community/Community-update", { board, user });
  // 제목
  // 작성자
  // 내용
});

// update
router.put("/Community/update/:postId", async (req, res, next) => {
  try {
    let body = req.body;
    console.log("=========================");
    console.log(body);
    console.log(body.inputContent);
    console.log("=========================");
    await Board.update(
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
    res.redirect("/Community/" + req.params.postId);
    return res.status(200).send("success");
  } catch (err) {
    next(err);
  }
});

// comment update 창 가져오기
router.get("/Community/comment/update/:comment_id", async (req, res, next) => {
  const user = await req.session.IsLogined;
  console.log(req.params);
  const { comment_id } = req.params;
  // console.log(commentId);
  const comment = await Comment.findOne({ where: { comment_id: comment_id } });
  res.render("Community/Community__comment-update", { comment, user });
  // 제목
  // 작성자
  // 내용
});

// comment Update
router.put("/Community/comment/update/:commentId", async (req, res, next) => {
  try {
    let body = req.body;
    console.log("=========================");
    console.log(body);
    console.log(body.inputContent);
    console.log("=========================");
    await Comment.update(
      {
        content: body.inputContent,
        commenter: body.inputCommentWriter,
      },
      {
        where: { comment_id: req.params.commentId },
      }
    );
    res.redirect(`/Community/${body.inputPostId}`);
    return res.status(200).send("success");
  } catch (err) {
    next(err);
  }
});

// 삭제
router.delete("/Community/delete/:postId", async (req, res, next) => {
  const { postId } = req.params;
  console.log("====================");
  console.log(postId);
  console.log("====================");
  const board = await Board.destroy({ where: { post_id: postId } });
  return res.send("success");
});

// 삭제 comment
router.delete(
  "/Community/comment/delete/:commentId",
  async (req, res, next) => {
    const { commentId } = req.params;
    const comment = await Comment.destroy({ where: { comment_id: commentId } });
    // res.redirect("/Community/" + req.params.postId);
    return res.send("delete comment success");
  }
);

// 삭제
router.delete("/Community/delete/:postId", async (req, res, next) => {
  const { postId } = req.params;
  console.log("====================");
  console.log(postId);
  console.log("====================");
  const board = await Board.destroy({ where: { post_id: postId } });
  return res.send("success");
});

// 삭제 comment
router.delete(
  "/Community/comment/delete/:commentId",
  async (req, res, next) => {
    const { commentId } = req.params;
    const comment = await Comment.destroy({ where: { comment_id: commentId } });
    // res.redirect("/Community/" + req.params.postId);
    return res.send("delete comment success");
  }
);

router.get('/History', (req, res) =>{
  res.render('History/HistoryPage')
})

// =============================================================================================================================

// FAQ
// FAQ 전체 리스트
router.get("/Faq", async (req, res, next) => {
  const user = await req.session.IsLogined;
  const faqs = await Faq.findAll({
    order: [["post_id", "DESC"]],
    offset: 0,
  });
  faqs.forEach((el) => {
    el.dataValues.date = moment(el.dataValues.date).format("YYYY-MM-DD");
  });
  console.log(faqs);
  console.log(user);
  res.render("Faq/faq", { faqs, user });
});

// FAQ 작성창
router.get("/faq-add", (req, res) => {
  const user = req.session.IsLogined;
  res.render("Faq/faq-add", { user });
});

// FAQ 작성
router.post("/Faq", async (req, res, next) => {
  try {
    let body = req.body;
    await Faq.create({
      question: body.inputQuestion,
      answer: body.inputAnswer,
      boarder: body.inputWriter,
    });
    res.redirect("/Faq");
  } catch (err) {
    next(err);
  }
});

// FAQ 업데이트 작성창
router.get("/Faq/update/:postId", async (req, res, next) => {
  const user = await req.session.IsLogined;
  const { postId } = req.params;
  const faq = await Faq.findOne({ where: { post_id: postId } });
  res.render("Faq/faq-update", { faq, user });
});

// FAQ 업데이트
router.put("/Faq/update/:postId", async (req, res, next) => {
  try {
    let body = req.body;
    console.log("=========================");
    console.log(body);
    console.log(body.inputContent);
    console.log("=========================");
    await Faq.update(
      {
        //   post_id: this.post_id,
        question: body.inputQuestion,
        answer: body.inputAnswer,
        boarder: body.inputWriter,
        //   date: now,
      },
      {
        where: { post_id: req.params.postId },
      }
    );
    res.redirect("/Faq");
    return res.status(200).send("success");
  } catch (err) {
    next(err);
  }
});

// FAQ 삭제
router.delete("/Faq/delete/:postId", async (req, res, next) => {
  const { postId } = req.params;
  console.log("====================");
  console.log(postId);
  console.log("====================");
  const faq = await Faq.destroy({ where: { post_id: postId } });
  return res.send("success");
});






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
  console.log('./jowon의 실행');
  
    const user = await Girugi.findAll({
      where : {
        grade : 2
      }
    })
      console.log("유저는 :",user);
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

