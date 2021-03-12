const express=require('express');
const router=express.Router();
const home_controller=require('../controller/home_controller');
console.log("router loaded");

router.get('/',home_controller.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/comments',require('./comments'));

router.use('/api',require("./api"));
module.exports=router;