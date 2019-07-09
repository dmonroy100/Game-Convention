
console.log("running app.js")
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// AUTHENTICATION MODULES
session = require("express-session")
bodyParser = require("body-parser")

flash = require('connect-flash')
// END OF AUTHENTICATION MODULES


const mongoose = require( 'mongoose' );

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    //'mongodb://heroku_lzp0htxz:74m9me91evl2nmqh6qi0bn4t2b@ds247637.mlab.com:47637/heroku_lzp0htxz' ||
    'mongodb://heroku_1mh6jvp2:mggno2vrjh2036n5tf58ppqh7t@ds247637.mlab.com:47637/heroku_1mh6jvp2';
console.log("setting uristring to "+uristring)
//uristring ='mongodb://localhost/convengo'
    // Makes connection asynchronously.  Mongoose will queue up database
    // operations and release them when the connection is complete.
    mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });

Test = require('./models/test')
console.log("Test = "+Test)
console.log("about to require ./models/User")
User = require( './models/user' )
console.log("required User")

const listController = require('./controllers/listController')
const profileController = require('./controllers/profileController')
const discussionController = require('./controllers/discussionController')

var app = express();


var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// here we set up authentication with passport
const passport = require('passport')
const configPassport = require('./config/passport')
configPassport(passport)





/*************************************************************************
     HERE ARE THE AUTHENTICATION ROUTES
**************************************************************************/

app.use(session({ secret: 'zzbbyanana' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));



const approvedLogins = ["tjhickey724@gmail.com","csjbs2018@gmail.com"];

// here is where we check on their logged in status
app.use((req,res,next) => {
  res.locals.title="YellowCartwheel"
  res.locals.loggedIn = false
  if (req.isAuthenticated()){
    if (req.user.googleemail.endsWith("@brandeis.edu") ||
          approvedLogins.includes(req.user.googleemail))
          {
            console.log("user has been Authenticated")
            res.locals.user = req.user
            res.locals.loggedIn = true
          }
    else {
      res.locals.loggedIn = false
    }
    console.log('req.user = ')
    console.dir(req.user)
  }
  next()
})

// here are the authentication routes

app.get('/loginerror', function(req,res){
  res.render('loginerror',{})
})

app.get('/login', function(req,res){
  res.render('login',{})
})

// route for logging out
app.get('/logout', function(req, res) {
        req.session.destroy((error)=>{console.log("Error in destroying session: "+error)});
        console.log("session has been destroyed")
        req.logout();
        res.redirect('/');
    });


// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));


app.get('/login/authorized',
        passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/loginerror'
        })
      );


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log("checking to see if they are authenticated!")
    // if user is authenticated in the session, carry on
    res.locals.loggedIn = false
    if (req.isAuthenticated()){
      console.log("user has been Authenticated")
      res.locals.loggedIn = true
      return next();
    } else {
      console.log("user has not been authenticated...")
      res.redirect('/login');
    }
}

// we require them to be logged in to see their profile
app.get('/Profile', isLoggedIn, function(req, res) {
        res.render('Profile')
    });

app.get('/editprofile',isLoggedIn, (req,res)=>{
  res.render('editprofile')
})

app.get('/profiles', isLoggedIn, profileController.getAllProfiles);
app.get('/showProfile/:id', isLoggedIn, profileController.getOneProfile);


app.post('/updateProfile',profileController.update);


// END OF THE AUTHENTICATION ROUTES


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(function(req,res,next){
  console.log("about to look for routes!!!")
  //console.dir(req.headers)
  next()
});


app.get('/', function(req, res, next) {
  res.render('index');
});


app.get('/editprofile', function(req, res, next) {
  res.render('editprofile');
});

app.get('/convbar', function(req, res, next) {
  res.render('convbar');
});

app.get('/navbar', function(req, res, next) {
  res.render('navbar');
});

app.get('/profileview', function(req, res, next) {
  res.render('profileview');
});

//render addConvention, showList
app.get('/addConvention', function(req, res, next) {
  res.render('addConvention',{title:"Adding Convention"});
});

app.use(function(req,res,next){
  console.log("about to look for post routes!!!")
  next()
});

function processFormData(req,res,next){
  res.render('formdata',
     {title:"Form Data", Name:req.body.Name, Website:req.body.Website,From:req.body.From, To:req.body.To, Location:req.body.Location, des:req.body.Description})
}
const cID = require ('./config/clientId.js');
const cSecret = require('./config/clientSecret.js');

var Amadeus = require('amadeus');
var amadeus = new Amadeus({
    clientId: cID.getclientID,
    clientSecret: cSecret.getclientSecret
  });

exports.getAmadeus = function (data){
  return amadeus;
}

  // when completed put all API calls in a seperate folder for better readability

app.post('/processform', listController.saveConvenion)

app.get('/showConventions', listController.getAllConventions)
app.get('/showConvention/:id', listController.getOneConvention)
app.get('/showConvention/:id', listController.travel)



app.get('/discussion',discussionController.getAllDiscussion)

app.post('/processDiscussion',discussionController.saveDiscussion)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
