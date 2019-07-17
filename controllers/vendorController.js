'use strict';
const Vendor = require( '../models/Vendor' );

exports.saveVendor = ( req, res ) => {
  let newVendor = new Celebrity( {
    Name: req.body.Name,
    Website: req.body.Website,
    From: req.body.Date,
    To: req.body.Date,
    Description: req.body.Description,
    Booth: req.body.Booth,
    Picture: req.body.Picture
    }
  )

  newVendor.save()
    .then( () => {
      res.redirect( '/showConvention' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.getOneVendor = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  Vendor.findOne({_id:id})
    .exec()
    .then( ( vendor ) => {
      res.render( 'showVendor', {
        vendor:vendor, title:"vendor"
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
