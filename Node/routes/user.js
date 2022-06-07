const express = require('express');
const User = require('../models/user')

const router = express.Router();

router.route('/')
.get(async( req, res, next) =>{
  try {
    const users = await User.findAll();
    console.log("Database에서 받아온 데이터 : ",users);
    // res.send({loggedIn : true, loginData: req.session.loginData})
    // res.json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
})/* 이 get요청은 어디로 갈까요? -> index.js로 가서 user라우터로 갑니다*/
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        id: req.body.id,
        passwd: req.body.passwd,
        name: req.body.name,
        tel: req.body.tel,
        email: req.body.email,
        grade : req.body.grade,
        yjuclass : req.body.yjuclass,
      });
      
      console.log("등록된 유저명 : " ,user);
        await res.status(201).json(user);
      } catch (err) {
      res.send(false);
      console.error(err);
      next(err);
    }
  });  
/* 이 post요청은 어디로 갈까요? ->  */

module.exports = router;
