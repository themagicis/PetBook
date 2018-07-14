const PassportLocalStrategy = require('passport-local').Strategy
const db = require('../data/database')

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  console.log(email)
  const user = {
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim(),
    picture: req.body.picture.trim()
  }

  const existingUser = db.getUserByEmail(email)
  if (existingUser) {
    return done('E-mail already exists!')
  }

  db.addUser(user);
  db.saveChanges();

  return done(null)
})
