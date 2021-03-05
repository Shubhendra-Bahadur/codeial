const User = require("../modals/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    res.render("user", {
      title: "user",
      profile_user: user,
    });
  });
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "codeial | Sign up",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

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
      console.log("error in finding user in signing up ", err);
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in finding user in signinng up ", err);
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {
  req.flash('success','Logged in Succesfully');
  return res.redirect("/");
};

module.exports.endSession = function (req, res) {

  req.logout();
  req.flash('success','Logged out Succesfully');

  return res.redirect("/");
};

module.exports.update = function (req, res) {
  // console.log(req);
  // console.log(req.params.id);

  if (req.user.id == req.params.id) {
    // User.findById(req.params.id, function (err, user) {
    //   user.name = req.body.name;
    //   user.email = req.body.email;
    //   user.save();
    //   return res.redirect("back");
    // });

    User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
      return res.redirect("back");
    })
  }else{
    return res.status(401).send('unauthorised');
  }
};

