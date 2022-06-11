const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
// const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/auth/join', async (req, res, next) => {
  console.log("여기서 반응합니다.");
  const { id, passwd, passwdck, name, tel, grade, email } = req.body;
  try {
    const exUser = await User.findOne({ where: { id } });
    if (exUser) {
      return res.redirect('/join');
    }
    const hash = await bcrypt.hash(passwd, 12);
    await User.create({
      id,
      passwd : hash,
      name,
      tel,
      grade,
      email
    })
    return res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
})



module.exports = router;

