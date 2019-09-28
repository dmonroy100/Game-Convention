'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var agentSchema = Schema( {
  m_convId: ObjectId,
  userId: ObjectId,
  googlename: String,
  googleemail: String,
  agencyName: Stirng,
  websiteURL: String,
  celebrityNames: String,
  m_createdAt: Date,
  Approval: {type: Boolean, default:false}
} );

module.exports = mongoose.model( 'Mod', modSchema );
