const User = require("../modals/user");

module.exports.profile = function (req, res) {
  if(req.cookies.user_id)
  {
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user',{
                    title:"user Profile",
                    user:user
                })
            }
            return res.redirect('/users/sign-in');
        })
  }
  else{
      return res.redirect('/users/sign-in');
  }
};

module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "codeial | Sign up",
  });
};

module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "codeial | Sign in",
  });
};

module.exports.create = function (
  req,
  res //signup page
) {
  if (req.body.password != req.body.Confirm_Password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up ",err);
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in finding user in signinng up ",err);
          return;
        }
        return res.redirect('/users/sign-in')
      });
    }else{
        return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req,res) {
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in signing in",err);
            return;
        }

        if(user)
        {
            console.log(user);
            console.log(req.body);
            if(user.password!=req.body.password)
            {
                console.log("incorrect password credentials");
                return res.redirect('back'); 
            }
            res.cookie('user_id',user.id);
            console.log(req.cookies);
            console.log('sign in successful');
            return res.redirect('/users/profile');
        }
        else{
            console.log("incorrect credentials");
            return res.redirect('back');
        }
    })
};

module.exports.endSession=function(req,res)
{
    console.log(req.cookies);
    req.cookies.user_id=null;
    console.log(req.cookies);
    return res.redirect('/users/sign-in');
}
