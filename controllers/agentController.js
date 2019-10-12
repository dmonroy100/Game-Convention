'use strict';
const Agent = require( '../models/Agent' );
const User = require( '../models/user' );

exports.saveAgent = ( req, res ) => {

  let newAgent = new Agent(
   {
    a_celebId: req.Agent.a_celebId,
    googleemail:req.user.googleemail,
    agencyName:req.Agent.agencyName,
    a_celebrityIds:req.Agent.celebrityNames,
    a_createdAt: new Date(),
    a_level: 0,

   }
  )

  newAgent.save()
    .then( () => {
      res.redirect( '/showAgentPage/');
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.updateDeny = (req, res) => {
    Agent.deleteOne({_id:req.body.agentId})
    .exec()
    .then(()=>{res.redirect('/showAgentPage/'+req.body.agentId)})
    .catch((error)=>{res.send(error)})
  }

    exports.updateAgentLevel = ( req, res ) => {

      Agent.findOne({_id:req.body.agentId})
      .exec()
      .then((p) => {
        cons
        le.dir(p)
        p.a_level = 2
        console.log("in")
        p.save()
        .then( ( agent ) => {
          res.redirect( '/showAgentPage/'+req.body.agentId);
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
