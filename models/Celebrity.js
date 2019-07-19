'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var CelebritySchema = Schema( {
  convId: ObjectId,
  Name: String,
  Description: String,
  Picture: String,
  Schedule:String,
  Title: String,
  Approval: {type: Boolean, default:false}
} );

module.exports = mongoose.model('Celebrity', CelebritySchema);
