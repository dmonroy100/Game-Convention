'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var discussionSchema = Schema( {
  convId: ObjectId,
  d_username: String,
  d_title: String,
  d_details: String
} );

module.exports = mongoose.model( 'Discussion', discussionSchema );
