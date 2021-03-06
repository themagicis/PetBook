const jwt = require('jsonwebtoken')
const db = require('../data/database')
const PassportLocalStrategy = require('passport-local').Strategy

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const user = {
    email: email.trim(),
    password: password.trim()
  }

  let savedUser = db.getUserByEmail(email)
  console.log(savedUser);

  if (!savedUser) {
    const error = new Error('Incorrect email or password')
    error.name = 'IncorrectCredentialsError'

    return done(error)
  }

  const isMatch = savedUser.password === user.password

  if (!isMatch) {
    const error = new Error('Incorrect email or password')
    error.name = 'IncorrectCredentialsError'

    return done(error)
  }

  const payload = {
    sub: savedUser.id
  }

  // create a token string
  const token = jwt.sign(payload, 's0m3 r4nd0m str1ng')

  const pets = db.getPets(savedUser.id).map(p => { 
    return { 
      id: p.id, 
      name: p.name, 
      picture: p.pictures[0]
    }
  })
  
  const data = {
    id: savedUser.id,
    name: savedUser.name,
    picture: savedUser.picture,
    roles: savedUser.roles,
    pets: pets
  }

  return done(null, token, data)
})
