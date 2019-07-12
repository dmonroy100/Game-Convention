'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var modSchema = Schema( {
  convId: ObjectId,
  userId: ObjectId,
  createdAt: Date()
} );

module.exports = mongoose.model( 'Moderator', modschema );
