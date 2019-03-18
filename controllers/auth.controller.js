const Card = require('../models/user.model')
const passport = require('passport')

const createError = require('http-errors');

module.exports.register = (req, res, next) => {
  
  user.findOne({email: req.body.email})
    .then(user => {
      if(user) {
        throw createError(409, 'User already registered')
      } else {
        return new User(req.body).save()
      }
    })
    .then(user => res.status(201).json(user))
    .catch(next)
}

module.exports = (req, res, next) => {
  passport.authenticate('local-auth', (error, user, message) => {
    if(error) {
      next(error)
    } else if (!user) {
      throw createError(409, message)
    } else {
      req.login(user, error => {
        if (error) {
          next(error)
        } else {
          res.status(201).json(user)
        }
      })
    }
  })(req, res, next)
}

module.exports.logout = (req, res, next) => {
  req.logout();
  res.status(204).json()
}