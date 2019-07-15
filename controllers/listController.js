'use strict';
const Convention = require( '../models/Convention' );

exports.travel = ( req, res ) => {
  console.dir(con)
  con.Location = req.body.Location

  amadeus.referenceData.locations.get({
    keyword: '<%= convention.Location %>'
  }).then(function(response){
    console.log(response.data); // first page
    return amadeus.next(response);
  })
}


exports.saveConvenion = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newConvention = new Convention( {
    Name: req.body.Name,
    Website: req.body.Website,
    Facebookgroup: req.body.Facebookgroup,
    From: req.body.From,
    To:req.body.To,
    Location:req.body.Location,
    Description:req.body.Description,
    Moderator: req.body.Moderator,
    Guest:req.body.Guest,
    Vendor: req.body.Vendor,
    Schedule:req.body.Schedule,
    Picture: req.body.Picture,
    Badges: req.body.Badges,
    Notifications: req.body.Notifications,
    Guest: req.body.Guest
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
  Convention.find({}).sort({Date: 1})
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
    console.log('the name is '+ Convention.Name)
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
//needs changed~!!!!!!
  exports.update = ( req, res ) => {

  Convention.findOne(res.locals.Name)
  .exec()
  .then((p) => {
    console.log("just found a profile")
    console.dir(p)
    p.Name = req.body.Name
    p.Picture = req.body.Picture
    p.Website = req.body.Website
    p.Facebookgroup = req.body.Facebookgroup
    p.From=req.body.From
    p.To=req.body.To
    p.Location=req.body.Location
    p.Description=req.body.Description
    p.Moderator=req.body.Moderator
    p.Guest=req.body.Guest
    p.Vendor= req.body.Vendor
    p.Schedule=req.body.Schedule
    p.Badges=req.body.Badges
    p.Notifications=req.body.Notifications
    p.Guest=req.body.Guest
    console.log("in")
    p.save()
     .then( ( convention ) => {
      res.render( 'conventions', {
        convention:convention, title:"convention"
        } );
     })
   })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
};
