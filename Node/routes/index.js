const express = require('express');
const { User } = require('../models');
const axios = require('axios');
const { Is } = require('nunjucks/src/nodes');
const router = express.Router();

let IsLogined = false
// GET / 라우터
router.route('/')
.post(async (req,res) =>{
   try {
      // console.log("index.js 받아온 바디 정보 : " ,req.body.user);
      if(req.body.user){
      IsLogined = true
      }
      console.log("index.js의 IsLogined",IsLogined)
      req.session.IsLogined = IsLogined /* 세션을 저장하는 코드 */
      res.cookie("IsLogined",IsLogined)
      return res.send(IsLogined)
      // IsLogined를 login.js로 보냈음.
      
   } catch (error) {
      console.error(error.message);
   }
})
.get(async (req, res) => {
   try {
         await res.render('MainPage/MainPage.html')
   } catch (error) {
      console.error(error);
   }
})

router.get('/loginCheck',(req,res) =>{
   if(req.session.IsLogined){
      res.send({ loggedIn : true , loginData : req.session.loginData})
   }else{
      res.send({loggedIN : false})
   }
})
// router.get('/', (req, res) => {
//    res.render('MainPage/MainPage.html', { title: 'Express' });
//  });

router.get('/user', (req, res) => {
   console.log(req.body);
})

router.get('/login',(req,res) =>{
   res.render('login/login.html',{title : 'Express'})
   console.log("세션 있나요?",req.session.IsLogined);
// }
})

router.get('/Community',(req,res)=>{
   
   res.render('Community/Community',{IsLogined})
})
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
