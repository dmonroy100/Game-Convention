console.log("running app.js")
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const amadeus = require('./amadeusObject/amadeusCalls')

// AUTHENTICATION MODULES
session = require("express-session")
bodyParser = require("body-parser")

flash = require('connect-flash')
// END OF AUTHENTICATION MODULES


const mongoose = require( 'mongoose' );

const mlab = 'mongodb://heroku_03g7jdqb:hnnbgerrljnmvdlu2uc57sqt3t@ds243607.mlab.com:43607/heroku_03g7jdqb';
const localMongo = 'mongodb://localhost/convengo';


var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    //localMongo
    mlab

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


User = require( './models/user' )
// Moderator = require('../models/Mod')

const listController = require('./controllers/listController')
const profileController = require('./controllers/profileController')
const discussionController = require('./controllers/discussionController')
const modController = require('./controllers/modController')
const qAndaController = require('./controllers/qAndaController')
const vendorController = require('./controllers/vendorController')
const celebrityController = require('./controllers/celebrityController')


var app = express();


var ownerList= [
   'greghsu23@brandeis.edu',
   'tlsimala@brandeis.edu'
 ]

//different levels of moderators, tests
var modOneList = [
    "xly18ling@gmail.com"
]

var modTwoList = [
    "greghsu23@gmail.com"
]

var modThreeList = [
    "dmonroy@brandeis.edu"
]

var modFourList = [
    "rami072@brandeis.edu"
]

var modFiveList = [
    "cathyxie@brandeis.edu"
]


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



// here is where we check on their logged in status
app.use((req,res,next) => {
  res.locals.title="ConvenGo"
  res.locals.loggedIn = false
  if (req.isAuthenticated()){
    if (req.user.googleemail.endsWith("@brandeis.edu") ||req.user.googleemail.endsWith("@gmail.com")||
          approvedLogins.includes(req.user.googleemail))
          {
            console.log("user has been Authenticated")
            res.locals.user = req.user
            res.locals.loggedIn = true
          }
    else {
      res.locals.loggedIn = false
    }
    if (req.user){
     if (ownerList.includes(req.user.googleemail || req.user.googleemail.endsWith("@brandeis.edu"))){
       console.log("Owner has logged in")
       res.locals.status = 'owner'
     } else if (modOneList.includes(req.user.googleemail || req.user.googleemail.endsWith("@brandeis.edu"))){
       console.log("Mod Level One has logged in")
       res.locals.status = 'modOne'
     } else if (modTwoList.includes(req.user.googleemail || req.user.googleemail.endsWith("@brandeis.edu"))){
       console.log("Mod Level Two has logged in")
       res.locals.status = 'modTwo'
     } else if (modThreeList.includes(req.user.googleemail || req.user.googleemail.endsWith("@brandeis.edu"))){
       console.log("Mod Level Three has logged in")
       res.locals.status = 'modThree'
     } else if (modFourList.includes(req.user.googleemail || req.user.googleemail.endsWith("@brandeis.edu"))){
       console.log("Mod Level Four has logged in")
       res.locals.status = 'modFour'
     } else if (modFiveList.includes(req.user.googleemail || req.user.googleemail.endsWith("@brandeis.edu"))){
       console.log("Mod Level Five has logged in")
       res.locals.status = 'modFive'
     }else {
       console.log('regular user has logged in')
       res.locals.status = 'reg'
     }
   }
  }
  next()
})


app.get('/error', function(req,res){
  res.render('error',{})
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
                successRedirect : '/showConventions',
                failureRedirect : '/error'
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



// END OF THE AUTHENTICATION ROUTES


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if(isLoggedIn==true && ownerList.includes(req.user.googleemail)){
  app.get('/moderatorRequests', function(req, res, next) {
    res.render('moderatorRequests');
  });
}
app.use(function(req,res,next){
  console.log("about to look for routes!!!")
  //console.dir(req.headers)
  next()
});


app.get('/', function(req, res, next) {
  res.render('index');
});

app.get('/convbar', function(req, res, next) {
  res.render('convbar');
});

app.get('/profile', function(req, res, next) {
  res.render('profile');
});

app.get('/bookmark', function(req, res, next) {
  res.render('bookmark');
});

app.get('/navbar', function(req, res, next) {
  res.render('navbar');
});

app.get('/navigation', function(req, res, next) {
  res.render('navigation');
});


//test forum
app.get('/distest', function(req, res, next) {
  res.render('distest');
});

app.get('/disbar', function(req, res, next) {
  res.render('disbar');
});

//render addConvention, showList
app.get('/addConvention', function(req, res, next) {
  res.render('addConvention',{title:"Adding Convention"});
});

app.get('/editConvention/:convid',
  listController.addConvention,
  function(req, res, next) {
    res.render('editConvention',{title:"Editting Convention"});

});

app.get('/moderatorRequests', function(req, res, next) {
  res.render('moderatorRequests',{title:"moderatorRequests"});
});


app.use(function(req,res,next){
  console.log("about to look for post routes!!!")
  next()
});

function processFormData(req,res,next){
  res.render('formdata',
     {title:"Form Data", Name:req.body.Name, Website:req.body.Website,Facebookgroup:req.body.Facebookgroup,From:req.body.From, To:req.body.To, Location:req.body.Location, des:req.body.Description,Guest:req.body.Guest,Schedule:req.body.Schedule})
}


app.get('/apitest', function(req, res, next) {
  amadeus.run(req,res,next)
  res.send('apitest completed');
});


// when completed put all API calls in a seperate folder for better readability
//END OF API CALLS FOR AMADEUS


app.post('/processform', listController.saveConvenion)

app.get('/showConventions', listController.getAllConventions)
//app.get('/showConvention/:id', listController.getOneConvention)
// app.get('/showConvention/:id', listController.travel)
app.post('/editConvention',listController.update)
app.get('/showConvention/:convid',
    listController.addConvention,
    listController.addModerators,
    listController.addVendors,
    listController.addCelebrities,
    (req,res) => {
      res.render('convention',{title:'Convention'})
    }
  )
app.post('/processApprove', listController.updateApproval)
app.post('/processDeny', listController.updateDeny)

app.post('/processApprove2', celebrityController.updateApproval)
app.post('/processDeny2', celebrityController.updateDeny)

app.post('/processApprove3', vendorController.updateApproval)
app.post('/processDeny3', vendorController.updateDeny)

app.get('/showProfile/:id', profileController.getOneProfile)

app.get('/discussion',discussionController.getAllDiscussion)

app.post('/processDiscussion',discussionController.saveDiscussion)

app.post('/processRequest/:convid', modController.saveMod)

app.get('/modList', modController.getAllMod)

app.post('/processRequest2/:convid', celebrityController.saveCelebrity)

app.get('/celebrityList', celebrityController.getAllCelebrities)

app.post('/processRequest3/:convid', vendorController.saveVendor)

app.get('/vendorList', vendorController.getAllVendors)
////// Forums

app.post('/processFollowCon', profileController.followCon)

app.post('/processUnfollowCon', profileController.unfollowCon)


app.get('/postQuestion', function(req, res, next){
  res.render('postQuestion')
})

//app.post('/forumDelete', isLoggedIn, qAndaController.deleteQuestion)

app.get('/showQuestions',isLoggedIn, qAndaController.getAllQuestions)

app.post('/processQuestionPost', isLoggedIn, qAndaController.saveQuestionPost)

app.get('/showQuestion/:id', isLoggedIn, qAndaController.attachAllAnswers, qAndaController.showOneQuestion)

//to edit an existing question
app.get('/showQuestion/:id/editQuestion', qAndaController.showPreviousQ, qAndaController.editQuestion)

app.post('/showQuestion/:id/editQuestion/processQuestionPost',qAndaController.editQuestion)

//to save a new answer post
app.post('/showQuestion/:id/processAnswerPost', qAndaController.saveAnswer)

//to delete an existing answers
app.post('/showQuestion/:id/answerDelete',qAndaController.deleteAnswer)

//-------------




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
