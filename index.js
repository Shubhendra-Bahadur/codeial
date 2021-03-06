const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expresslayout = require("express-ejs-layouts");
const db = require("./config/mongoose");
//used for session cookie and passport
const session = require("express-session");
const passport = require("passport");
const passportJWT=require("./config/passport-jwt-strategy");
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);
const sassMiddleware=require("node-sass-middleware");
const flash=require("connect-flash");
const customMiddleWare=require("./config/middleware");


app.use(sassMiddleware({
  src:"./assets/scss",
  dest:'./assets/css',
  debug:true,
  outputStyle:'extended',
  prefix:'/css'
}))

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));
// console.log(__dirname);
//make the uploads path avalaible
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expresslayout);
//extract style ans scripts from sub pages
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "codeial",
    // todo change the secret before deployment  during deploment
    secret: "any text",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store:new MongoStore({
      mongooseConnection: db,
      autoRemove: "disabled",
    },function(err){
      console.log(err || 'connect mongoDb setup ok');
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleWare.setFlash);

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error: ", err); //console.log(`error: ${err}`);
    return;
  }
  console.log(`server is running successfully on port: ${port}`);
});
