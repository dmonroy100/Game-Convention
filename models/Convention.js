'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var conventionSchema = Schema( {
  Name: String,
  Location: String,
  Date: Date,
  Description: String,
  ConventionType: String,
  ConventionTicketPrice: String,
  ConventionCelebritiesGoing: String,
  ConventionContactInformation: String,
  ConventionPicture: String,
  ConventionEvents: String
} );

module.exports = mongoose.model('Convention', conventionSchema);
