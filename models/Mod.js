'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var modSchema = Schema( {
  m_convName: String,
  userId: ObjectId,
  m_email: String,
  m_reason: String,
  m_createdAt: Date
} );

module.exports = mongoose.model( 'Mod', modSchema );
