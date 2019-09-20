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
    } );
};

// this displays all of the skills
exports.getOneProfile = ( req, res ) => {

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

exports.addConventions = (req,res,next) => {
  Convention.find({_id:{$in:req.user.followCon}})
    .then((conventions) => {

      res.render('bookmark',{conventions})
    })
    .catch((error) => {
      res.send("rror in addConventions: "+error.message)
    })
}

exports.followCon = ( req, res ) => {
  console.log("in followCon!!")
  let p = req.user
    console.log("just follow a convention")
    //console.dir(p)
    console.log(req.body.convid)
    p.followCon.push(req.body.convid);
    p.save()
      .then( (s ) => {
        console.log("s.followCon.length="+s.followCon.length)
        console.log("saved user")
        res.redirect( 'bookmark' );
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        res.send('error in followcon: '+error.message)
      })
      .finally(function () {
        console.log("done with the followCon")
        // always executed
      })
}



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
    console.log("in followCon!!")
    let p = req.user
      console.log("just follow a convention")
      //console.dir(p)
      console.log(req.body.convid)
      const i = p.followCon.indexOf(req.body.convid)
      if (i==-1){
        res.redirect('bookmark')
      }
      p.followCon.splice(i,1)
      p.save()
        .then( (s ) => {
          console.log("s.followCon.length="+s.followCon.length)
          console.log("saved user")
          res.redirect( 'bookmark' );
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          res.send('error in unfollowcon: '+error.message)
        })
        .finally(function () {
          console.log("done with the unfollowCon")
          // always executed
        })
  }


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
