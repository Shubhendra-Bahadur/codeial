const Post = require("../../../modals/posts_db");
const comment = require("../../../modals/comment");

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return res.json(200, {
    message: "list of posts",
    posts: posts,
  });
};

module.exports.delete = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      post.remove();

      await comment.deleteMany({ post: req.params.id });

      return res.json(200, {
        message: "post and associated deleted successfully",
      });
    } else {
      return res.json(401, {
        message: "you cannot delete this post",
      });
    }
  } catch (err) {
    console.log("error posts_api: ", err);
    return res.json(500, {
      message: "internal server error",
    });
  }
};
