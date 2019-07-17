'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var CelebritySchema = Schema( {
  Name: String,
  From: Date,
  To: Date,
  Description: String,
  Picture: String,
  Schedule:String,
  Title: String
} );

module.exports = mongoose.model('Celebrity', CelebritySchema);
