const { user } = require("../config/mongoose");
const { populate } = require("../modals/posts_db");
const Post = require("../modals/posts_db");
const User = require("../modals/user");

// module.exports.home = function (req, res) {
//   // console.log(req.cookies);
//   // res.cookie('user',25);
//   // Post.find({}, function (err, posts) {
//   //   return res.render("home", {
//   //     title: "Codieal",
//   //     posts:posts
//   //   });
//   // });
//   // console.log(user);

//   Post.find({})
//     .populate("user")
//     .populate({
//       path: "comments",
//       populate: {
//         path: "user",
//       },
//     })
//     .exec(function (err, posts) {
//       User.find({}, function (err, users) {
//         return res.render("home", {
//           title: "Codieal",
//           posts: posts,
//           all_users:users
//         });
//       });
//     });
// };

//                     /---> showing that function is asynchronous
//                    /
module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let users = await User.find({});

    return res.render("home", {
      title: "Codieal",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("error- ", err);
    return;
  }
};

// Post.find({}).populate('comments').then(function());          //using then

// promise like functionality
// let posts=Post.find({}).populate('comments').exex();
//posts.then();

//
