const express=require('express');
const router=express.Router();
const passport=require("passport");
const user_controller=require('../controller/users_controller');
router.get('/profile/:id',passport.checkAuthentication,user_controller.profile);
router.post('/update/:id',passport.checkAuthentication,user_controller.update);
router.get('/sign-up',user_controller.signUp);
router.get('/sign-in',user_controller.signIn);
router.post('/create',user_controller.create);

// use passport as a middleware to authenticate
router.post('/session',passport.authenticate(
    'local',
    {failureRedirect:"/users/sign-in"},
),user_controller.createSession);

router.get('/sign-out',user_controller.endSession);
module.exports=router;