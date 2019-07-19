'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var modSchema = Schema( {
  m_convId: ObjectId,
  userId: ObjectId,
  m_email: String,
  m_reason: String,
  m_createdAt: Date,
  m_level: Number
  //m_conlist: [String],
  //m_status: ObjectId
} );

module.exports = mongoose.model( 'Mod', modSchema );
