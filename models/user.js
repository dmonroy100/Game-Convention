'use strict';
console.log("trying to load module User.js")
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

//var userSchema = mongoose.Schema( {any:{}})

var userSchema = Schema( {
  googleid: String,
  googletoken: String,
  googlename:String,
  googleemail:String,
  description: String,
  profilePicURL: String,
  bio: String,
  lastUpdate: Date,
  userName: String,
  city: String,
  state: String,
  type: String,
  postsmade: String,
  bookmarks: String,
  comments: String,
  twitterURL: String,
  instagramURL: String,
  facebookURL: String,
  websiteURL: String,
  followers: [ObjectId],
  following: [ObjectId],
  followCon: [ObjectId],
  //m_status: { type: Boolean, default: false },

} );

console.log("loaded module User")

module.exports = mongoose.model( 'User', userSchema );

/*
newUser.google.id    = profile.id;
newUser.google.token = token;
newUser.google.name  = profile.displayName;
newUser.google.email = profile.emails[0].value; // pull the first email
*/
