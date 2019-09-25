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
  ConventionType: String,
  ConventionTicketPrice: String,
  Badges: [String],
  Notifications: [String],
  Approval: {type: Boolean, default:false}
} );

module.exports = mongoose.model('Convention', conventionSchema);
