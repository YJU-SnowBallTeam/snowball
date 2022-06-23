const express = require("express");

const Notice = require("../models/notice");

const router = express.Router();
const moment = require("moment");
const { now } = require("moment");



router.route("/")
  .get(
    async (req, res) => {
      const user = await req.session.IsLogined;
      const notices = await Notice.findAll({
        order: [["post_id", "DESC"]],
        offset: 0,
      });
      notices.forEach((el) => {
        el.dataValues.date = moment(el.dataValues.date).format("YYYY-MM-DD");
      });
      res.render("Notice/notice.html", { notices, user });
      
    }
  ).post(async (req, res, next) => { /* 공지 작성 */
    try {
      let body = req.body;
      console.log("body 는", body);
      await Notice.create({
        title: body.inputTitle,
        content: body.inputContent,
        noticer: body.inputWriter,
      });
      console.log(body);
      res.redirect("/notice");
    } catch (err) {
      next("에러는 : ", err);
    }
  });

// 공지사항 작성창
router.get("/notice-add", (req, res) => {
  const user = req.session.IsLogined;
  res.render("Notice/notice-add", { user });
});

// 공지사항 작성

// 공지사항 상세페이지
router.get("/:postId", async (req, res, next) => {
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
router.get("/update/:postId", async (req, res, next) => {
  const user = await req.session.IsLogined;
  const { postId } = req.params;
  const notice = await Notice.findOne({ where: { post_id: postId } });
  res.render("Notice/notice-update", { notice, user });
});

// 공지사항 업데이트
router.put("/update/:postId", async (req, res, next) => {
  try {
    let body = req.body;
    await Notice.update(
      {
        title: body.inputTitle,
        content: body.inputContent,
        boarder: body.inputWriter,
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
router.delete("/delete/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const notice = await Notice.destroy({ where: { post_id: postId } });
  return res.send("success");
});

module.exports = router;