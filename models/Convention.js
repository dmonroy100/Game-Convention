'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var conventionSchema = Schema( {
  Name: String,
  Website: String,
  Facebookgroup: String,
  Location: String,
  From: Date,
  To: Date,
  Guest: String,
  Description: String,
  Picture: String,
  Schedule:String,
  ConventionType: String,
  ConventionTicketPrice: String,
  ConventionCelebritiesGoing: String,
  ConventionContactInformation: String,
  ConventionEvents: String
} );

module.exports = mongoose.model('Convention', conventionSchema);
