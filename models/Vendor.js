'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var VendorSchema = Schema( {
  convId: ObjectId,
  Name: String,
  Website: String,
  Description: String,
  Booth: String,
  Picture: String,
  Approval: {type: Boolean, default:false}

} );

module.exports = mongoose.model('Vendor', VendorSchema);
