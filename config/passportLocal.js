const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/UserSchema");


  passport.use(new LocalStrategy({
    usernameField:'email'
  },
   function(email,password, done){
    User.findOne({email:email},function(err, user){
      if(err){
        console.log('Error in findig user');
        return done(err);
      }
      if(!user || user.password != password){
        console.log('Invalid Username/password');
        return done(null,false);
      }
      return done(null, user);
    });
   }

));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) =>{
    User.findById(id,function(err,user){
      if(err){
        console.log('Error in finding user');
        return done(err);
      }

      return done(null, user);
    });
      
  });

  module.export= passport;

