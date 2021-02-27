const express=require('express');
const router=express.Router();
const passport=require('passport');
// const { pass } = require('../config/mongoose');
// const postsController=require("../controller/posts_controller");
const CommentController=require("../controller/comment_controller");

router.post("/create",passport.checkAuthentication,CommentController.create);
router.get("/delete/:id",passport.checkAuthentication,CommentController.delete);

module.exports=router;