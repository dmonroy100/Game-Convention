'use strict';
const Convention = require( '../models/Convention' );
const Mod = require( '../models/Mod' );

exports.addConvention = (req,res,next) => {
  console.log("convid = "+req.params.convid)
	Convention.findOne({_id:req.params.convid})
	.exec()
	.then( (convention) => {
		console.log("found the convention")
		console.log(convention)
		console.log(convention._id)
		res.locals.convention = convention
		next()
	})
	.catch((error) => {
		console.log("Error in AddConvention")
		res.send("error is "+error)
	})
}

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
    //ModeratorS: req.user.moderator,
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


	exports.addModerators = ( req, res, next ) => {
		  //gconsle.log('in getAllSkills')
			console.log("in addModerators")
			console.dir(res.locals)
		  const convid = res.locals.convention._id

		  Mod.find({m_convId:convid})
		    .exec()
		    .then( ( mods ) => {
					res.locals.modLists = mods
					next()
		    } )
		    .catch( ( error ) => {
		      console.log( error.message );
		      res.send("addModerators error :"+error.message)
		    } )
		    .then( () => {
		      //console.log( 'skill promise complete' );
		    } );
		};
//needs changed~!!!!!!
  exports.update = ( req, res ) => {

  Convention.findOne(res.locals.user_id)
  .exec()
  .then((p) => {
    console.log("just found a profile")
    console.dir(p)
    if(p.Picture = null){
      p.Picture=p.Picture
    }
    else{
      p.Picture = req.body.Picture
    }
    if(p.Website = null){
      p.Website=p.Website
    }
    else{
      p.Website = req.body.Website
    }
    if(p.Facebookgroup = null){
      p.Facebookgroup=p.Facebookgroup
    }
    else{
      p.Facebookgroup = req.body.Facebookgroup
    }
    if(p.From = null){
      p.From=p.From
    }
    else{
      p.From=req.body.From
    }
    if(p.To = null){
      p.To=p.To
    }
    else{
      p.To=req.body.To
    }
    if(p.Location = null){
      p.Location=p.Location
    }
    else{
      p.Location=req.body.Location
    }
    if(p.Description = null){
      console.log("if")
      console.log(p.Description)
      p.Description=req.body.Description
      console.log(p.Description)
    }
    else{
      console.log("else")
      console.log(p.Description)
      p.Description=p.Description
      console.log(p.Description)
    }
    if(p.Moderator = null){
      p.Moderator=p.Moderator
    }
    else{
      p.Moderator=req.body.Moderator
    }
    if(p.Guest = null){
      p.Guest=p.Guest
    }
    else{
      p.Guest=req.body.Guest
    }
    if(p.Vendor = null){
      p.Vendor=p.Vendor
    }
    else{
      p.Vendor= req.body.Vendor
    }
    if(p.Schedule=null){
      p.Schedule=p.Schedule
    }
    else{
      p.Schedule=req.body.Schedule
    }
    if(p.Badges=null){
      p.Badges=p.Badges
    }
    else{
      p.Badges=req.body.Badges
    }
    if(p.Notifications=null){
      p.Notifications=p.Notifications
    }
    else{
        p.Notifications=req.body.Notifications
    }
    // p.Name = req.body.Name
    // p.Picture = req.body.Picture
    // p.Website = req.body.Website
    // p.Facebookgroup = req.body.Facebookgroup
    // p.From=req.body.From
    // p.To=req.body.To
    // p.Location=req.body.Location
    // p.Description=req.body.Description
    // p.Moderator=req.body.Moderator
    // p.Guest=req.body.Guest
    // p.Vendor= req.body.Vendor
    // p.Schedule=req.body.Schedule
    // p.Badges=req.body.Badges
    // p.Notifications=req.body.Notifications
    console.log("in")
    p.save()
     .then( ( convention ) => {
      res.render( 'convention', {
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
