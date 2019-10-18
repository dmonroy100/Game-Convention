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
Moderator = require('../models/Mod')

const listController = require('./controllers/listController')
const profileController = require('./controllers/profileController')
const discussionController = require('./controllers/discussionController')
const modController = require('./controllers/modController')
const qAndaController = require('./controllers/qAndaController')
const vendorController = require('./controllers/vendorController')
const celebrityController = require('./controllers/celebrityController')


var app = express();

//middleware that looks up the moderator for the User
//all the conventions they are moderators of
//if res.locals.modlist in mod controller
//function called level which gives it the modlist and convention id
//minus -1 if they aren't a moderator at all

var ownerList= [
   'tlsimala@brandeis.edu',
   "dmonroy@brandeis.edu"
 ]

//different levels of moderators, tests
var modOneList = [
]

var modTwoList = [
]

var modThreeList = [
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

//default celebrity bio
//who gets to edit the celebrities bio????
//moderator system for celebrity
//yeah im here, celebrity automatically added to to a convention page
//high level moderator can edit any celebrity
//this is my default bio?
//let me edit it if I want
//no just one default bio, i go there and change it
//celebrity control over there info/or no control give them the option
//moderators can direct responsibility
//agent login. verify???
//once an agent is logged in, and verified by owners
//then they have full control and then dedicated moderators to their celebrities
//add their celebrities and become a level 3
//agents can make their staff all level 3
//agent field for celebrity or agency
//moderator list for celebrities
//vendor logins
//confidence in models
//prints
//console.dirs to debug

// here is where we check on their logged in status
app.use((req,res,next) => {
  res.locals.title="ConvenGo"
  res.locals.loggedIn = false
  if (req.isAuthenticated()){
    if (req.user.googleemail.endsWith("@brandeis.edu") || req.user.googleemail.endsWith("@gmail.com")||
          approvedLogins.includes(req.user.googleemail))
          {
            console.log("user has been Authenticated")
            res.locals.user = req.user
            res.locals.loggedIn = true
          }
    else {
      res.locals.loggedIn = false
    }
  }
  if(req.user){
   Moderator modLists=modController.getAllMod;
   console.log(modLists.size())
    if(modLists.includes(req.user)){

    }
  }
    //this is where you do the mod list
    //if modList inclues req.user.Id
    //app.use((req,res, next)=> {
      //see if they are logged in
      //if req.users is logged in
      //const Mod=require("./model/Mod")
      //if(req.user){
      // mod.find(req.({userId: req.user._id}))
      //.then (modList=> {
    //    res.locals.modList=modList
            //next()
//    })
  //  } else {
      //if not res.locals.modList=[]
        //next()
  //  }

  //app.use((req, res, next)=> {

//}
  //goes to -1 then .max get max
  //return getMax()
  //return d.level
  //listController.convid getModeratorLevel
//}
//})
//controller that looks for convention id then adds the level

  //}
    if (req.user){
     if (ownerList.includes(req.user.googleemail)){
       console.log("Owner has logged in")
       res.locals.status = 'owner'
     } else if (modOneList.includes(req.user.googleemail)){
       console.log("Mod Level One has logged in")
       res.locals.status = 'modOne'
     } else if (modTwoList.includes(req.user.googleemail)){
       console.log("Mod Level Two has logged in")
       res.locals.status = 'modTwo'
     } else if (modThreeList.includes(req.user.googleemail)){
       console.log("Mod Level Three has logged in")
       res.locals.status = 'modThree'
     } else {
       console.log('regular user has logged in')
       res.locals.status = 'reg'
     }
   } else {
     res.locals.status='reg'
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

console.log("**** Set the view engine!!!! **** ")

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

app.get('/convbar', function(req, res, next) {
  res.render('convbar');
});

app.get('/profile', function(req, res, next) {
  res.render('profile');
});

app.get('/bookmark',
  profileController.addConventions,
  function(req, res, next) {
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
//make sure they have mod level
  listController.addConvention,
  function(req, res, next) {
    res.render('editConvention',{title:"Editting Convention"});

});

//list controller get moderator level
//moderators vote to feature it
//post it up there
//five in one day
//feature add to conventions


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

app.post('/editConvention',listController.update)
app.get('/showConvention/:convid',
    isLoggedIn,
    listController.addConvention,
    listController.addModerators,
    listController.addVendors,
    listController.addCelebrities,
    listController.addDiscussion,
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

app.post('/processLevel0', modController.updateDeny)
app.post('/processLevel1', modController.updateModLevel1)
app.post('/processLevel2', modController.updateModLevel2)
app.post('/processLevel3', modController.updateModLevel3)

app.get('/showProfile/:id', profileController.getOneProfile)

app.get('/discussion',discussionController.getAllDiscussion)

app.post('/processDiscussion/:convid',discussionController.saveDiscussion)

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
