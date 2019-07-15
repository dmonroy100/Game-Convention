'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var answerSchema = Schema( {
  userId: ObjectId,
  questionId: ObjectId,
  userName: String,
  answer: String,
  createdAt: Date,
  profilePicURL: String
} );

module.exports = mongoose.model( 'AnswerPost', answerSchema );
