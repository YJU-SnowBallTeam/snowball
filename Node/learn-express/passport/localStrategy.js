const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'passwd',
  }, async (id, passwd, done) => {
    try {
      const exUser = await User.findOne({ where: { id } });
      if (exUser) {
        const result = await bcrypt.compare(passwd, exUser.passwd);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }));
};