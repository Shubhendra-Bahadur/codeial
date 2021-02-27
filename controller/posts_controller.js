const Post = require("../modals/posts_db");
const comment=require("../modals/comment");
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

// module.exports.delete = function (req, res) {
// //   console.log(req.query.id);
//   const id=req.query.id;
//   Post.findByIdAndDelete(id,function(err){
//       if(err)
//       {
//           console.log("not able to delete post or post not found",err);
//           return
//       }
//       return res.redirect("back");
//   })
  
// };
module.exports.delete = function (req, res) {
  Post.findById(req.params.id,function(err,post){
    //.id converts ._id into strings
    if(post.user==req.user.id){
      post.remove();
      comment.deleteMany({post:req.params.id},function(err){
        return res.redirect("back");
      })
      }else{
        return res.redirect("back");
    }
  })
}
