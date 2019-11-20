'use strict';
const Convention = require( '../models/Convention' );
const Mod = require( '../models/Mod' );
const Celebrity = require('../models/Celebrity');
const Vendor = require('../models/Vendor');
const Discussion = require('../models/Discussion');

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
    Guest: req.body.Guest,
    }
  )

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
    } );
};

exports.addCelebrities = ( req, res, next ) => {
    //gconsle.log('in getAllSkills')
    console.log("in addCelebrities")
    console.dir(res.locals)
    const convid = res.locals.convention._id

    Celebrity.find({convId:convid})
      .exec()
      .then( ( celebrities ) => {
        res.locals.celebrityList = celebrities
        next()
      } )
      .catch( ( error ) => {
        console.log( error.message );
        res.send("addCelebrities error :"+error.message)
      } )
      .then( () => {

      } );
  };

exports.addVendors = ( req, res, next ) => {

    console.log("in addVendors")
    console.dir(res.locals)
    const convid = res.locals.convention._id

    Vendor.find({convId:convid})
      .exec()
      .then( ( vendors ) => {
        res.locals.vendorList = vendors
        next()
      } )
      .catch( ( error ) => {
        console.log( error.message );
        res.send("addVendors error :"+error.message)
      } )
      .then( () => {

      } );
  };

	exports.addModerators = ( req, res, next ) => {

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

		    } );
		};

    exports.addDiscussion = ( req, res, next ) => {

        console.log("in discussion")
        console.dir(res.locals)
        const convid = res.locals.convention._id

        Discussion.find({convId:convid})
          .exec()
          .then( ( discussion ) => {
            res.locals.discussion = discussion
            next()
          } )
          .catch( ( error ) => {
            console.log( error.message );
            res.send("addDiscussion error :"+error.message)
          } )
          .then( () => {

          } );
      };


      exports.updateDeny = (req, res) => {
        console.log("convention id" + req.body.convid)
          // Convention.findOne({_id:req.body.convid})
          Convention.deleteOne({_id:req.body.convid})
          .exec()
          .then(()=>{res.redirect('/showConventions')})
          .catch((error)=>{res.send(error)})
        }

  exports.updateApproval = ( req, res ) => {

    Convention.findOne({_id:req.body.convid})
  	.exec()
    .then((p) => {
      console.dir(p)
      p.Approval = true
      console.log("in")
      p.save()
       .then( ( convention ) => {
        res.redirect( 'showConvention/'+req.body.convid);
       })
     })
    .catch(function (error) {
      // handle error
  		console.log("error in update")
      console.dir(error);
  		res.send("error in update = "+error)
    })
    .finally(function () {
      // always executed
    });
  };

//needs changed~!!!!!!
  exports.update = ( req, res ) => {

  Convention.findOne({_id:req.body.convid})
	.exec()
  .then((p) => {
    console.dir(p)
    p.Name = req.body.Name
    p.Picture = req.body.Picture
    p.Website = req.body.Website
    p.Facebookgroup = req.body.Facebookgroup
    p.From=req.body.From
    p.To=req.body.To
    p.Location=req.body.Location
    p.Description=req.body.Description
    //p.Moderator=req.body.Moderator
    //p.Guest=req.body.Guest
    //p.Vendor= req.body.Vendor
    p.Schedule=req.body.Schedule
    //p.Badges=req.body.Badges
    //p.Notifications=req.body.Notifications
    console.log("in")
    p.save()
     .then( ( convention ) => {
      res.redirect( 'showConvention/'+req.body.convid);
     })
   })
  .catch(function (error) {
    // handle error
		console.log("error in update")
    console.dir(error);
		res.send("error in update = "+error)
  })
  .finally(function () {
    // always executed
  });
};

exports.getModeratorLevel = (req,res) => {
  const convid= req.params.convId
  res.locals.modlevel=-1
  for(let i=0; i<res.locals.conventionsList.length;i++){
    if(conventionsList[i].convid==convid){
      res.locals.modLevel=conventionList[i].level
    }
  }
  if ((req.user.googleemail=="dmonroy@brandeis.edu") ||  (req.user.googleemail=="tlsimala@brandeis.edu") || (req.user.googleemail=="lespinalro100@brandeis.edu")){ 
    	res.locals.modLevel = 3
  }
  next()
}
