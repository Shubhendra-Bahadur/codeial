const express=require('express');
const router=express.Router();
const usersApi=require('../../../controller/api/v1/users_api')
router.post('/create-session',usersApi.createSession);


module.exports=router;