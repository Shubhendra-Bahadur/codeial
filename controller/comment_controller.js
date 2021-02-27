const Comment = require("../modals/comment");
const Post = require("../modals/posts_db");

module.exports.create = function (req, res) {
  // console.log(req);
  Post.findById(req.body.post, function (err, post) {
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          if (err) {
            console.log("error in creating comment ", err);
            return;
          }
          post.comments.push(comment);
          post.save();
          return res.redirect("back");
        }
      );
    }
  });
};

module.exports.delete = function (req, res) {
//   console.log(req);
//   console.log(req.params);
  Comment.findById(req.params.id, function (err, comment) {
      let postID=comment.post;
      comment.remove();
      if (comment.user == req.user.id) {
        Post.findByIdAndUpdate(postID, {$pull:{comments:req.params.id}},function(err,post){
            return res.redirect("back");
        });
    } else {
      return res.redirect("back");
    }
  });
};
