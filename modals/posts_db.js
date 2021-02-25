const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comment'
    }]
},{
    timestamps:true
});

const Posts=mongoose.model('posts',postSchema);
module.exports=Posts;