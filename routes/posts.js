const express=require('express');
const router=express.Router();
const passport=require('passport');
const { pass } = require('../config/mongoose');
const postsController=require("../controller/posts_controller");

router.post("/create",passport.checkAuthentication,postsController.create);
// router.get("/delete",passport.checkAuthentication,postsController.delete);
router.get("/delete/:id",passport.checkAuthentication,postsController.delete);

module.exports=router;