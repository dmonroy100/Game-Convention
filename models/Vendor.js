'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var VendorSchema = Schema( {
  convId: ObjectId,
  Name: String,
  Website: String,
  From: Date,
  To: Date,
  Description: String,
  Booth: String,
  Picture: String

} );

module.exports = mongoose.model('Vendor', VendorSchema);
