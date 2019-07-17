'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var CelebritySchema = Schema( {
  convId: ObjectId,
  Name: String,
  From: Date,
  To: Date,
  Description: String,
  Picture: String,
  Schedule:String,
  Title: String
} );

module.exports = mongoose.model('Celebrity', CelebritySchema);
