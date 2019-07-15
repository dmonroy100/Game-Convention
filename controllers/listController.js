'use strict';
const Convention = require( '../models/Convention' );


exports.travel = ( req, res ) => {
  console.dir(con)
  con.Location = req.body.Location

  amadeus.referenceData.locations.get({
    keyword: 'con.Location'
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
    Picture: req.body.Picture
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

  User.findOne(res.locals.user._id)
  .exec()
  .then((p) => {
    console.log("just found a profile")
    console.dir(p)
    p.userName = req.body.userName
    p.profilePicURL = req.body.profilePicURL
    p.zipcode = req.body.zipcode
    p.lastUpdate = new Date()
    p.save()
     .then( ( profile ) => {
      res.render( 'showProfile', {
          profile:profile, title:"Profile"
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
