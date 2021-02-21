const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    content:{
        type:text,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
},{
    timestamps:true
});

const Posts=mongoose.model('posts',postSchema);
module.exports=Posts;