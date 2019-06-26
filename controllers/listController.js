'use strict';
const Convention = require( '../models/Convention' );

exports.saveConvenion = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newConvention = new Convention( {
    Name: req.body.Name,
    Date: req.body.Date,
    Location:req.body.Location,
    Description:req.body.Description,
    }
  )

  //console.log("skill = "+newSkill)

  newConvention.save()
    .then( () => {
      res.redirect( '/showConventions' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.getAllConventions = ( req, res ) => {
  Convention.find( )
    .exec()
    .then( ( conventions ) => {
      res.render( 'conventions', {
        conventions: conventions, title:"Conventions"
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

exports.getOneConvention = ( req, res ) => {
	  //gconsle.log('in getAllSkills')
	  const id = req.params.id
	  console.log('the id is '+id)
	  Convention.findOne({_id:id})
	    .exec()
	    .then( ( convention ) => {
	      res.render( 'convention', {
	        convention:convention, title:"Convention"
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
