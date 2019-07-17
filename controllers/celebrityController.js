'use strict';
const Celebrity = require( '../models/Celebrity' );

exports.saveCelebrity = ( req, res ) => {
  let newCelebrity = new Celebrity( {
    convId: req.params.convid,
    Name: req.body.Name,
    Description: req.body.Description,
    Picture: req.body.Picture,
    Title: req.body.Title
    }
  )

  newCelebrity.save()
    .then( () => {
      res.redirect( '/showConvention/'+req.params.convid  );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.getAllCelebrities = ( req, res ) => {
  Celebrity.find()
    .exec()
    .then( ( celebrityList ) => {
      res.render( 'celebrityList', {
        title:"celebrityList", celebrityList:celebrityList
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
    } );
};

exports.getOneCelebrity = ( req, res ) => {
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
    } );
};
