const express = require('express');
const { User } = require('../models');
const axios = require('axios');
const { Is } = require('nunjucks/src/nodes');
const router = express.Router();

let IsLogined = null;
// GET / 라우터
router.route('/')
.post(async (req,res) =>{
   try {
      console.log("누구세요? ",req.body);
      if(req.body){
         console.log("if문 안의 req.body입니다 ",req.body);
         IsLogined = req.body.user
      }
      console.log("index.js의 IsLogined",IsLogined)
      req.session.IsLogined = IsLogined /* 세션을 저장하는 코드 */
      console.log("2번째 누구세요" ,IsLogined);
      console.log(req.session);
      return res.send(req.session)
      // IsLogined를 login.js로 보냈음.
      
   } catch (error) {
      console.error(error.message);
   }
})
.get(async (req, res) => {
   try {
      const user = await req.session.IsLogined
      console.log("get 요청 : ",user);
      await res.render('MainPage/ALP1.html' ,{ user })
   } catch (error) {
      console.error(error);
   }
})

router.get('/logout',(req,res) =>{
   IsLogined = null; 
   res.redirect('/')
})

router.post('/loginCheck',(req,res) =>{
   console.log(req.session)
   return res.send('sex')
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
