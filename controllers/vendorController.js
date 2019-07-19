'use strict';
const Vendor = require( '../models/Vendor' );

exports.saveVendor = ( req, res ) => {
  let newVendor = new Vendor( {
    convId: req.params.convid,
    Name: req.body.Name,
    Website: req.body.Website,
    Description: req.body.Description,
    Booth: req.body.Booth,
    Picture: req.body.Picture
    }
  )

  newVendor.save()
    .then( () => {
      res.redirect( '/showConvention/'+req.params.convid );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.getAllVendors = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  Vendor.find()
    .exec()
    .then( ( vendorList ) => {
      res.render( 'vendorList', {
        title:"vendorList",vendorList:vendorList
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


exports.updateDeny = (req, res) => {
  console.log("convention id" + req.body.vendorid)
    // Convention.findOne({_id:req.body.convid})
    Vendor.deleteOne({_id:req.body.vendorid})
    .exec()
    .then(()=>{res.redirect('/showConvention/'+req.body.convid)})
    .catch((error)=>{res.send(error)})
  }
    //console.log("This shouldn't happen!")
    // res.send(`unknown deleteId: ${deleteId} Contact the Developer!!!`)


exports.updateApproval = ( req, res ) => {

  Vendor.findOne({_id:req.body.vendorid})
	.exec()
  .then((p) => {
    console.dir(p)
    p.Approval = true
    console.log("in")
    p.save()
     .then( ( convention ) => {
      res.redirect('/showConvention/'+req.body.convid);
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
