'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var skillSchema = Schema( {
  ConventionName: String,
  ConventionLocation: String,
  ConventionDate: String,
  ConventionType: String,
  ConventionDescription: String,
  ConventionTicketPrice: String,
  ConventionCelebritiesGoing: String,
  ConventionContactInformation: String,
  ConventionPicture: String,
  ConventionEvents: String
} );

module.exports = mongoose.model( 'Skill', skillSchema );
