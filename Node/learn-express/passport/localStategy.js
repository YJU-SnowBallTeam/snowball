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
          done(null, false, { message: 'Passwd mismatch' });
        }
      } else {
        done(null, false, { message: 'id mismatch' });
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }));
};
