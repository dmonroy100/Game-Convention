'use strict';
const Celebrity = require( '../models/Celebrity' );

exports.saveCelebrity = ( req, res ) => {
  let newCelebrity = new Celebrity( {
    Name: req.body.Name,
    From: req.body.From,
    To: req.body.To,
    Description: req.body.Description,
    Picture: req.body.Picture,
    Title: req.body.Title
    }
  )

  newCelebrity.save()
    .then( () => {
      res.redirect( '/showConvention' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.getOneCelebrity = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  Celebrity.findOne({_id:id})
    .exec()
    .then( ( celebrity ) => {
      res.render( 'showCelebrity', {
        celebrity:celebrity, title:"celebrity"
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
