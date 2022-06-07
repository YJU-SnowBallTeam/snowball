const express = require('express');
const { User } = require('../models');
const axios = require('axios')
const router = express.Router();
let sex;
// GET / 라우터
router.route('/')
.post(async (req,res) =>{
   try {
      console.log("받아온 바디 정보 : " ,req.body);
      sex = req.body;
      console.log(req.body.Islogined);
      /* 이 정보를 get으로 보내야함. */

      if(req.body.Islogined == true){
         await res.render('Schedule/Schedule')
      }else{
         await res.render('MainPage/MainPage.html', { title: 'Express' });
      }
   } catch (error) {
      
   }
})
.get(async (req, res) => {
   try {
      // axios.post('/',(req,res)=> {
      //    console.log("받아온 바디 정보 : " ,req.body);
      //    const a = req.body;
      //    console.log(req.body.Islogined);
      // })

      console.log("받아온 바디 정보2 : " ,sex);
      const a = await req.body;
      console.log("Get요청의 body:",a.Islogined );
      // if(sex.Islogined == true){
      //    await res.render('MainPage/MainPage.html')
      //    console.log("sex");
      // }else{
      //    res.render('MainPage/MainPage.html', { title: 'Express' });
      //    console.log("nosex");
      // }
      res.render('MainPage/MainPage.html', { title: 'Express' });
   } catch (error) {
      
   }
      
   
})
// router.get('/', (req, res) => {
//    res.render('MainPage/MainPage.html', { title: 'Express' });
//  });

router.get('/user', (req, res) => {
   console.log(req.body);
})

router.get('/login',(req,res) =>{
   
   // if(req.headers.cookie === undefined){
   //    res.render('MainPage/MainPage.html')
   // }else if(req.headers.cookies){
   res.render('login/login.html',{title : 'Express'})
// }
})

router.get('/Community',(req,res)=>{
   res.render('Community/Community')
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
