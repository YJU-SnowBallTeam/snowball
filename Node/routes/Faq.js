const express = require("express");
const Faq = require("../models/faq");
const moment = require("moment");


const router = express.Router();

router.get("/", async (req, res, next) => {
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
  router.post("/", async (req, res, next) => {
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
  router.get("/update/:postId", async (req, res, next) => {
    const user = await req.session.IsLogined;
    const { postId } = req.params;
    const faq = await Faq.findOne({ where: { post_id: postId } });
    res.render("Faq/faq-update", { faq, user });
  });
  
  // FAQ 업데이트
  router.put("/update/:postId", async (req, res, next) => {
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
  router.delete("/delete/:postId", async (req, res, next) => {
    const { postId } = req.params;
    console.log("====================");
    console.log(postId);
    console.log("====================");
    const faq = await Faq.destroy({ where: { post_id: postId } });
    return res.send("success");
  });

  module.exports = router;