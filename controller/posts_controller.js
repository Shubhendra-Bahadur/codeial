const Post = require("../modals/posts_db");
const comment = require("../modals/comment");
module.exports.create = async function (req, res) {
  try {
    let post=await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if(req.xhr){
      // console.log("hello");
      // console.log(post);
      return res.status(200).json({
        data:{
          post:post
        },
        message:"post created!"
      })
    }

    req.flash('success',"post created");
    return res.redirect("back");
  } catch (err) {
    req.flash('error',err);
    return res.redirect("back");
  }
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
module.exports.delete = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    // console.log(req);
    // console.log(req.xhr);
    if (post.user == req.user.id) {
      post.remove();
      // console.log("bhkk1");
      await comment.deleteMany({ post: req.params.id });

      if(req.xhr){
        console.log("hello");
        return res.status(200).json({
          data:{
            post_id:req.params.id
          },
          message:"post deleted"
        })
      }

      req.flash('success',"Post deleted");
      return res.redirect("back");

    } else {
      req.flash('err',"you cannot delete that post");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash('error',err);
    return;
  }
};
