const express=require('express');
const passport=require("passport");
const router=express.Router();
const user_controller=require('../controller/users_controller');
router.get('/profile',user_controller.profile);
router.get('/sign-up',user_controller.signUp);
router.get('/sign-in',user_controller.signIn);
router.post('/create',user_controller.create);

// use passport as a middleware to authenticate
router.post('/session',passport.authenticate(
    'local',
    {failureRedirect:"/users/sign-in"},
),user_controller.createSession);
module.exports=router;