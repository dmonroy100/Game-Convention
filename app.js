console.log("running app.js")
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const amadeus = require('./amadeusObject/amadeusCalls')

// AUTHENTICATION MODULES
session = require("express-session")
bodyParser = require("body-parser")

flash = require('connect-flash')
// END OF AUTHENTICATION MODULES


const mongoose = require( 'mongoose' );

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    // 'mongodb://localhost/convengo' ||
    //'mongodb://heroku_lzp0htxz:74m9me91evl2nmqh6qi0bn4t2b@ds247637.mlab.com:47637/heroku_lzp0htxz' ||
    'mongodb://heroku_03g7jdqb:hnnbgerrljnmvdlu2uc57sqt3t@ds243607.mlab.com:43607/heroku_03g7jdqb';
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


console.log("about to require ./models/User")
User = require( './models/user' )
console.log("required User")

const listController = require('./controllers/listController')
const profileController = require('./controllers/profileController')
const discussionController = require('./controllers/discussionController')
const modController = require('./controllers/modController')
const qAndaController = require('./controllers/qAndaController');


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
    console.log('req.user = ')
    console.dir(req.user)
  }
  next()
})


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


var ownerList= [
  'cathyxie@brandeis.edu',
   'dmonroy@brandeis.edu',
   'rami072@brandeis.edu',
   'greghsu23@brandeis.edu',
   'tlsimala@brandeis.edu'
 ]

app.get('/login/authorized',
        passport.authenticate('google', {
                successRedirect : '/showConventions',
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
  listController.addModerators,
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
//app.get('/showConvention/:id', listController.travel)
app.post('/editConvention',listController.update)
app.get('/showConvention/:convid',
    listController.addConvention,
    listController.addModerators,
    (req,res) => {
      res.render('convention',{title:'Convention'})
    }
  )

app.get('/showProfile/:id', profileController.getOneProfile)

app.get('/discussion',discussionController.getAllDiscussion)

app.post('/processDiscussion',discussionController.saveDiscussion)

app.post('/processRequest/:convid', modController.saveMod)

app.get('/modList', modController.getAllMod)
////// Forums




app.get('/postQuestion', function(req, res, next){
  res.render('postQuestion')
})

//app.post('/forumDelete', isLoggedIn, qAndaController.deleteQuestion)

app.get('/showQuestions', qAndaController.getAllQuestions)

app.post('/processQuestionPost', qAndaController.saveQuestionPost)

app.get('/showQuestion/:id', qAndaController.attachAllAnswers, qAndaController.showOneQuestion)

// //to edit an existing question
// app.get('/showQuestion/:id/editQuestion',isLoggedIn, (req,res)=>{
//   res.render('editQuestion' ,{
//     req: req
//   })
// })

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
