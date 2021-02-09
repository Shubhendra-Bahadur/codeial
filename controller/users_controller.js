const User = require("../modals/user");

module.exports.profile = function (req, res) {
  res.render("user", {
    title: "user",
  });
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

};
