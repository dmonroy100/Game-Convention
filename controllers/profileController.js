'use strict';
const User = require( '../models/user' );
const Convention = require( '../models/Convention' );

exports.update = ( req, res ) => {

  User.findOne(res.locals.user._id)
  .exec()
  .then((p) => {
    console.log("just found a profile")
    console.dir(p)
    p.userName = req.body.userName
    p.profilePicURL = req.body.profilePicURL
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
};


exports.getAllProfiles = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  User.find()
    .exec()
    .then( ( profiles ) => {
      res.render( 'profiles', {
        profiles:profiles, title:"profiles"
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

// this displays all of the skills
exports.getOneProfile = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  User.findOne({_id:id})
    .exec()
    .then( ( profile ) => {
      res.render( 'showProfile', {
        profile:profile, title:"profile"
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

exports.followCon = ( req, res ) => {
  User.findOne(res.locals.user_id)
    .exec()
    .then((p) => {
      console.log("just follow a convention")
      console.dir(p)
      p.followCon.push(req.params.convid);
      p.save()
       .then( ( ) => {
        res.render( '/bookmark', {
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

exports.getAllFollowCon = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  User.findOne(res.locals.user_id)
    .exec()
    .then( ( profile ) => {
      res.render( '/bookmark', {
        profile:profile
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

exports.unfollowCon = ( req, res ) => {
  User.findOne(res.locals.user_id)
    .exec()
    .then((p) => {
      console.log("just found a profile")
      console.dir(p)
      p.followCon.pull(req.params.convid);
      p.save()
       .then( ( ) => {
        res.render( '/showConvention/'+req.params.convid, {
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

exports.followUser = ( req, res ) => {
  User.findOne(res.locals.user_id)
    .exec()
    .then((p) => {
      console.log("just found a profile")
      console.dir(p)
      p.following.push(req.params.userId);
      console.log("in")
      p.save()
       .then( ( ) => {
        res.render( 'profile', {
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

exports.unfollowUser = ( req, res ) => {
  User.findOne(res.locals.user_id)
    .exec()
    .then((p) => {
      console.log("just found a profile")
      console.dir(p)
      p.following.pull(req.params.userId);
      console.log("in")
      p.save()
       .then( ( ) => {
        res.render( 'profile', {
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
