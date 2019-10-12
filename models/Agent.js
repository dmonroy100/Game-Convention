'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var agentSchema = Schema( {
  a_celebId: ObjectId,
  googleemail: String,
  agencyName: Stirng,
  celebrityNames: String,
  a_createdAt: Date,
  a_level: {type: Number, default: 0}
} );

module.exports = mongoose.model( 'Agent', agentSchema );
