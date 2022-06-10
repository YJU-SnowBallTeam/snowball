const express = require('express');
const router = express.Router();
const Board = require("../models/board");
const Comment = require("../models/comment");


let IsLogined;
// GET / 라우터
router.route('/')
.post(async (req,res) =>{

   console.log("req.method",req.method);
   console.log('post.(/)의 IsLogined',IsLogined);
   req.session.IsLogined = IsLogined;
   console.log('post.(/)의 req session',req.session)
   return res.send(req.session)
})
.get(async (req, res) => {
   try {
      const user = await req.session.IsLogined
      console.log("get 요청 : ",user);
      res.render('MainPage/ALP1.html' ,{ user })
   } catch (error) {
      console.error(error);
   }
})

router.get('/logout',(req,res) =>{
   console.log("세션 삭제");
   req.session.IsLogined = null;
   
   console.log('/logout의 req.session',req.session);

   res.redirect('/')
})


router.route('/logined')
.get((req,res) =>{
   IsLogined = req.session.IsLogined;
   req.session.save(()=>{
      
      console.log("세션 생성 완료");
      res.redirect('/')
   })
})

.post((req,res) =>{
   IsLogined = req.body.user;
   req.session.IsLogined = IsLogined
   console.log("/logined 의 post" ,IsLogined);
   console.log("post logined에서 받은 req.body",req.session.IsLogined);
   req.session.save(
      res.redirect('/')
   )
})

router.get('/user', (req, res) => {
   console.log(req.body);
})

router.get('/login',(req,res) =>{
   res.render('login/login.html',{title : 'Express'})
   console.log("세션 있나요?",req.session.IsLogined);
// }
})

// router.get('/Community', async (req,res)=>{
//    const user = await req.session.IsLogined
//    console.log("get 요청 : ",user);
//    res.render('Community/Community' ,{ user })
// })


// 공지사항 전체 리스트


router.get("/Notice", async (req, res, next) => {
   const Notices = await Board.findAll({
     order: [["post_id", "DESC"]],
     offset: 0,
   });
   Notices.forEach((el) => {
     el.dataValues.date = moment(el.dataValues.date).format("YYYY-MM-DD");
   });
   res.render("Notice/notice", { Notices });
 });
 
 router.get("/Community-add", (req, res) => {
   res.render("Community/Community-add", { title: "Express" });
 });
 
 // 커뮤니티 전체 리스트
 router.route("/Community")
 .get( async (req, res, next) => {
   const boarders = await Board.findAll({
     order: [["post_id", "DESC"]],
     offset: 0,
   });
   boarders.forEach((el) => {
     el.dataValues.date = moment(el.dataValues.date).format("YYYY-MM-DD");
   });
   res.render("Community/Community", { boarders });
 })
 .post( async (req, res, next) => {
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
     res.render("Community/Community-detail", { board, comments });
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
   const { postId } = req.params;
   const board = await Board.findOne({ where: { post_id: postId } });
   res.render("Community/Community-update", { board });
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
   console.log(req.params);
   const { comment_id } = req.params;
   // console.log(commentId);
   const comment = await Comment.findOne({ where: { comment_id: comment_id } });
   res.render("Community/Community__comment-update", { comment });
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





router.get('/Schedule',(req,res)=>{
   res.render('Schedule/Schedule')
})
router.get('/register',(req,res)=>{
   res.render('Register/signup')
})
router.get('/schedule',(req,res)=>{
   res.render('Schedule/schedule')
})

router.get('/gongji',(req,res) =>{
   res.render('Gongji/gongji')
})

router.get('/gongji/writePage',(req,res) =>{
   res.render('writePage/writePage')
})

router.get('/profile',(req,res) =>{
   res.render("profile/profile",{
      name : req.body.name,
      class : req.body.class
   })
})
module.exports = router;
