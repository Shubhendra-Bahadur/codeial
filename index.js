const express = require("express");
const cookieParser=require('cookie-parser');
const app = express();
const port = 8000;
const expresslayout = require("express-ejs-layouts");
const db = require("./config/mongoose");
//used for session cookie and passport
const session=require("express-session");
const passport=require("passport");
const passportLocal=require("./config/passport-local-strategy")

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));
app.use(expresslayout);
//extract style ans scripts from sub pages
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(session({
  name:'codeial',
  // todo change the secret before deployment  during deploment
  secret:"any text",
  saveUninitialized:false,
  resave:false,
  cookie:{
    maxAge:(1000*60*100),
  }
}))

app.use(passport.initialize());
app.use(passport.session());

// use express router
app.use("/", require("./routes"));


app.listen(port, function (err) {
  if (err) {
    console.log("Error: ", err); //console.log(`error: ${err}`);
    return;
  }
  console.log(`server is running successfully on port: ${port}`);
});
