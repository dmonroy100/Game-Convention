'use strict';
const Mod = require( '../models/Mod' );
const User = require( '../models/user' );

exports.saveAgent = ( req, res ) => {

  let newAgent = new Agent(
   {
    m_convId: req.params.convid,
    googlename:req.user.googlename,
    userId: req.user._id,
    googleemail:req.user.googleemail,
    m_reason: req.body.m_reason,
    m_createdAt: new Date(),
    m_level: 2,

   }
  )

  newAgent.save()
    .then( () => {
      res.redirect( '/showConvention/'+req.params.convid );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.updateDeny = (req, res) => {
  console.log("convention id" + req.body.modid)
    Mod.deleteOne({_id:req.body.modid})
    .exec()
    .then(()=>{res.redirect('/showConvention/'+req.body.convid)})
    .catch((error)=>{res.send(error)})
  }

    exports.updateModLevel2 = ( req, res ) => {

      Mod.findOne({_id:req.body.modid})
      .exec()
      .then((p) => {
        cons
        le.dir(p)
        p.m_level = 2
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

// this displays all of the skills
exports.getAllMod = ( req, res ) => {

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

    } );
};
