const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../modals/user')
//authentication using passport

passport.use(new LocalStrategy({
    usernameField:'email'
},
    function(email,password,done){
        // find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err)
            {
                console.log("error in finding user ---> passport");
                return done(err);
            }

            if(!user || user.password!=password){
                console.log("invalid username password");
                return done(null,false);
            }

            return done(null,user);
        })
    }


));