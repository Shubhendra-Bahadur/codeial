const express=require('express');
const router=express.Router();
const passport=require('passport');
const { pass } = require('../config/mongoose');
const postsController=require("../controller/posts_controller");

router.post("/create",passport.checkAuthentication,postsController.create);
router.get("/delete",postsController.delete);

module.exports=router;