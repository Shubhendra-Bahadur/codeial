const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/codeial_develope');
const db=mongoose.connection;

db.on('error',console.error.bind(console,"there is error in database"));
db.once('open',function()
{
    console.log("database is succesfully running");
})

module.exports=db;