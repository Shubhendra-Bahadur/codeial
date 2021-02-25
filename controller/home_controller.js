const { user } = require("../config/mongoose");
const Post = require("../modals/posts_db");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user',25);
  // Post.find({}, function (err, posts) {
  //   return res.render("home", {
  //     title: "Codieal",
  //     posts:posts
  //   });
  // });
  // console.log(user);

  Post
    .find({})
    .populate("user")
    .exec(function (err, posts) {
      return res.render("home", {
        title: "Codieal",
        posts: posts,
      });
    });
};
