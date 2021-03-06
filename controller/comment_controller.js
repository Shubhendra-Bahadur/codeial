const Comment = require("../modals/comment");
const Post = require("../modals/posts_db");

module.exports.create = async function (req, res) {
  // console.log(req);
  try {
    let post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();
      return res.redirect("back");
    }
  } catch (err) {
    console.log("error- ", err);
    return;
  }
};

module.exports.delete = async function (req, res) {
  //   console.log(req);
  //   console.log(req.params);
  try {
    let comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      let postID = comment.post;

      comment.remove();

      let post = Post.findByIdAndUpdate(postID, {
        $pull: { comments: req.params.id },
      });
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("error- ", err);
    return;
  }
};
