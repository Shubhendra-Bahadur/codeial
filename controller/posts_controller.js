const Post = require("../modals/posts_db");

module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, user) {
      if (err) {
        console.log("error in creating post", err);
        return;
      }
      return res.redirect("back");
    }
  );
};

module.exports.delete = function (req, res) {
//   console.log(req.query.id);
  const id=req.query.id;
  Post.findByIdAndDelete(id,function(err){
      if(err)
      {
          console.log("not able to delete post or post not found",err);
          return
      }
      return res.redirect("back");
  })
  
};
