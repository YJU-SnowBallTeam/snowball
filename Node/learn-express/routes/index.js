const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
  res.render('MainPage/MainPage.html', { title: 'Express' });
});

// 로그인
router.get('/auth', (req, res) => { 
  res.render('login/login.html',{title : 'Express'})
})

// 회원가입
router.get('/auth/join', (req, res) => {
  res.render('Register/signup.html', { title: 'Express' });
})

router.get('/Community', (req, res) => {
  res.render('Community/Community');
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

router.get('/board/post', (req, res) => {
  res.redirect('/post');
})
module.exports = router;
