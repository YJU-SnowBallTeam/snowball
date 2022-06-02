const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
  res.render('MainPage/MainPage.html', { title: 'Express' });
});

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
