const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('./models/userModel')

const opts={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY

module.exports = (passport) =>{
    passport.use(
    new jwtStrategy(opts, (jwt_payload, done) =>{
    userModel.findById(jwt_payload.id).then((user)=>{
        if (user) return done(null, user)
        return done(null, false);
    }).catch(error=>{
        return done(null, false);
    })
    })); 
    passport.serializeUser(function(user, cb) {
        cb(null, user);
      });
      
      passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
      })};