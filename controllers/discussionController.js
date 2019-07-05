'use strict';
const Discussion = require( '../models/Discussion' );

exports.saveDiscussion = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)

  let newDiscussion = new Discussion(
   {

    d_username: req.body.d_username,
    d_title: req.body.d_title,
    d_details: req.body.d_details,

   }
  )

  //console.log("skill = "+newSkill)

  newDiscussion.save()
    .then( () => {
      res.redirect( 'discussion' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

// this displays all of the skills
exports.getAllDiscussion = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  Discussion.find()
    .exec()
    .then( ( discussion ) => {
      res.render( 'discussion', {
        title:"discussion",d_title:d_title
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};
