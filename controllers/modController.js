'use strict';
const Mod = require( '../models/Mod' );
const User = require( '../models/user' );

exports.saveMod = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)

  let newMod = new Mod(
   {

    m_convId: req.params.convid,
    userId: req.user._id,
    m_email: req.body.m_email,
    m_reason: req.body.m_reason,
    m_createdAt: new Date(),
    m_level: 0

    //m_status: req.user.m_status //set user.m_status to true

   }
  )

  //console.log("skill = "+newSkill)

  newMod.save()
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
    //console.log("This shouldn't happen!")
    // res.send(`unknown deleteId: ${deleteId} Contact the Developer!!!`)


    exports.updateModLevel1 = ( req, res ) => {

      Mod.findOne({_id:req.body.modid})
      .exec()
      .then((p) => {
        console.dir(p)
        p.m_level = 1
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

    exports.updateModLevel2 = ( req, res ) => {

      Mod.findOne({_id:req.body.userId})
      .exec()
      .then((p) => {
        console.dir(p)
        p.m_level = 2
        console.log("in")
        p.save()
        .then( ( convention ) => {
          res.redirect( 'showConvention/'+req.body.m_convId);
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

    exports.updateModLevel3 = ( req, res ) => {

      Mod.findOne({_id:req.body.userId})
      .exec()
      .then((p) => {
        console.dir(p)
        p.m_level = 3
        console.log("in")
        p.save()
        .then( ( convention ) => {
          res.redirect( 'showConvention/'+req.body.m_convId);
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
    exports.updateModLevel4 = ( req, res ) => {

      Mod.findOne({_id:req.body.userId})
      .exec()
      .then((p) => {
        console.dir(p)
        p.m_level = 4
        console.log("in")
        p.save()
        .then( ( convention ) => {
          res.redirect( 'showConvention/'+req.body.m_convId);
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

    exports.updateModLevel5 = ( req, res ) => {

      Mod.findOne({_id:req.body.userId})
      .exec()
      .then((p) => {
        console.dir(p)
        p.m_level = 5
        console.log("in")
        p.save()
        .then( ( convention ) => {
          res.redirect( 'showConvention/'+req.body.m_convId);
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
  //gconsle.log('in getAllSkills')
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
      //console.log( 'skill promise complete' );
    } );
};
