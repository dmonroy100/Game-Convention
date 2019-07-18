'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var conventionSchema = Schema( {
  Name: String,
  Website: String,
  Facebookgroup: String,
  Location: String,
  From: Date,
  To: Date,
  Description: String,
  Picture: String,
  Schedule:String,
  m_status: ObjectId,
  ConventionType: String,
  ConventionTicketPrice: String,
  Badges: [String],
  Notifications: [String],
  Approval: False
} );

module.exports = mongoose.model('Convention', conventionSchema);
