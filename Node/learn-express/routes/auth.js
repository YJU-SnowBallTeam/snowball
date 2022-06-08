const express = require('express');
const passport = require('passport');

const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/join', async (req, res, next) => {
  const { id, passwd, name, tel, email, yjuclass, grade } = req.body;
  console.log("req.body 는 : ",req.body);
  try {
    const exUser = await User.findOne({ where: { id } });
    if (exUser) {
      console.log("ID 존재함");
      return res.redirect('/auth/join');
    }
    // 암호화
    const hash = await bcrypt.hash(passwd, 12);
    await User.create({
      id,
      passwd: hash,
      name,
      tel,
      email,
      yjuclass,
      grade,
    });
    console.log('DB 추가완료');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

// router.get('/logout', (req, res) => {
//   req.logout();
//   req.session.destroy();
//   req.redirect('/');
// });


module.exports = router;