'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var conventionSchema = Schema( {
  Name: String,
  Location: String,
  From: Date,
  To: Date,
  Description: String,
  Picture: String,
  ConventionType: String,
  ConventionTicketPrice: String,
  ConventionCelebritiesGoing: String,
  ConventionContactInformation: String,
  ConventionEvents: String
} );

module.exports = mongoose.model('Convention', conventionSchema);
