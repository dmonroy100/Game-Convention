'use strict';
const Question = require( '../models/Question' );
const Answer = require( '../models/Answer' );

exports.saveQuestionPost = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to post to a question.")
  }

  let newQuestion = new Question(
    {
      userId: req.user._id,
      //questionId: req._id,
      userName:req.user.userName,
      question: req.body.question,
      description: req.body.description,
      createdAt: new Date()
    }
  )

  newQuestion.save()
  .then( () => {
    res.redirect( 'showQuestions' );
  } )
  .catch( error => {
    res.send( error );
  } );
};

// this displays all of the skills
exports.getAllQuestions = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  Question.find()
  .exec()
  .then( ( questions ) => {
    res.render('showQuestions',{questions:questions,title:"showQuestions"})
  } )
  .catch( ( error ) => {
    console.log( error.message );
    return [];
  } )
  .then( () => {
    //console.log( 'skill promise complete' );
  } );
};


// this displays all of the skills
exports.showOneQuestion = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  Question.findOne({_id:id})
  .exec()
  .then( ( question ) => {
    res.render( 'showQuestion', {
      req: req,
      question:question
    } );
  } )
  .catch( ( error ) => {
    console.log( error.message );
  } )
};

//show previous question input
exports.showPreviousQ = (req, res ) => {
  const id = req.params.id
  Question.findOne({_id:id})
  .exec()
  .then( ( question ) => {
    res.render( 'editQuestion', {
      req: req,
      question: question
    });
  })
  .then(() => {
    res.redirect('back')
  })
  .catch(function (error) {
    console.log(error);
  })
}

//edit question function
exports.editQuestion = ( req, res ) => {
  const id = req.params.id
  Question.findOne({_id:id})
  .exec()
  .then( ( question ) => {
    question.question = req.body.question
    question.description = req.body.description
    question.save()
  })
  .then(() => {
    res.redirect('/showQuestion/'+id)
  })
  .catch(function (error) {
    console.log("edit question failed!")
    console.log(error);
  })
};

exports.saveAnswer = (req,res) => {
  const questionId = req.params.id
  console.log("questionId is: " + questionId);

  let newAnswer = new Answer({
    userId: req.user._id,
    questionId: questionId,
    userName:req.user.userName,
    answer: req.body.answer,
    createdAt: new Date(),
    profilePicURL: req.user.profilePicURL
  })

  newAnswer.save()
  .then( () => {
    res.redirect( '/showQuestion/'+questionId );
  } )
  .catch( error => {
    res.send( error );
  } );
}

//attach all answers
exports.attachAllAnswers = ( req, res, next ) => {
  console.log("in aAFC with id= "+req.params.id)
  const ObjectId = require('mongoose').Types.ObjectId;
  Answer.find({questionId:ObjectId(req.params.id)})
  .exec()
  .then( ( answers ) => {
    res.locals.answers = answers
    next()
  } )
  .catch( ( error ) => {
    console.log( error.message );
    return [];
  } )
};

exports.deleteAnswer = (req, res) => {
  let deleteId = req.body.delete
  if (typeof(deleteId)=='string') {
    // you are deleting just one thing ...
    Answer.deleteOne({_id:deleteId})
    .exec()
    .then(()=>{res.redirect('back')})
    .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='object'){
    Answer.deleteMany({_id:{$in:deleteId}})
    .exec()
    .then(()=>{res.redirect('back')})
    .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='undefined'){
    //console.log("This is if they didn't select a skill")
    res.redirect('back')
  } else {
    //console.log("This shouldn't happen!")
    res.send(`unknown deleteId: ${deleteId} Contact the Developer!!!`)
  }

};
