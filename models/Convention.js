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
  ModeratorS: [ObjectId],
  Guest: [String],
  Vendors: [String],
  Description: String,
  Picture: String,
  Schedule:String,
  ConventionType: String,
  ConventionTicketPrice: String,
  //ConventionCelebritiesGoing: String,
  ConventionContactInformation: String,
  ConventionEvents: String,
  Badges: [String],
  Notifications: [String]
} );

module.exports = mongoose.model('Convention', conventionSchema);
