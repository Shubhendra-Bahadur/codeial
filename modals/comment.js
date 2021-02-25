const mongoose=require('mongoose');

const commentSchema=mongoose.Schema({
    Content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts'
    }
},{
    timestamps:true
});

const Comment=mongoose.model('comment',commentSchema);
module.exports=Comment;