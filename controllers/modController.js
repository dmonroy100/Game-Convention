'use strict';
const Mod = require( '../models/Mod' );
const User = require( '../models/user' );

exports.saveMod = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)

  let newMod = new Mod(
   {

    m_convId: req.params.convid,
    userId: req.user._id,
    m_email: req.body.m_email,
    m_reason: req.body.m_reason,
    m_createdAt: new Date(),
    m_status: 0

   }
  )

  //console.log("skill = "+newSkill)

  newMod.save()
    .then( () => {
      res.redirect( '/showConvention/'+req.params.convid );
    } )
    .catch( error => {
      res.send( error );
    } );
};

// this displays all of the skills
exports.getAllMod = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  Mod.find()
    .exec()
    .then( ( modLists ) => {
      res.render( 'modList', {
        title:"modList",modLists:modLists
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
