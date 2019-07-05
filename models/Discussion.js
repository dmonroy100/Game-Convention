'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var discussionSchema = Schema( {
  d_username: String,
  d_title: String,
  d_details: String
} );

module.exports = mongoose.model( 'Discussion', discussionSchema );
