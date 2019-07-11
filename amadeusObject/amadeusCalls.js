//const amadeusObj = require ('../app.js')

// API KEY CALLS FOR AMADEUS
const cID = require ('../config/clientId.js');
const cSecret = require('../config/clientSecret.js');

var Amadeus = require('amadeus');
var amadeus = new Amadeus({
    clientId: cID.getclientID,
    clientSecret: cSecret.getclientSecret
  });
console.dir(['secrets',cID,cSecret])


exports.run = function (req,res,next){
  console.log('running amadeus')
  amadeus.referenceData.urls.checkinLinks.get({
    airlineCode: 'BA'
  }).then(function(response){
    console.log("****** SUCCESS ")
    console.dir(response.result)
    res.locals=response.result
    next()
    //console.dir(response)
    //console.log(response.body);   //=> The raw body
    //console.log(response.result); //=> The fully parsed result
    //console.log(response.data);   //=> The data attribute taken from the result
  }).catch(function(error){
    console.log("******* FAILURE :(")
    console.dir(error)
    res.send(error.body)
    //console.log(error.response); //=> The response object with (un)parsed data
    //console.log(error.response.request); //=> The details of the request made
    //console.log(error.code); //=> A unique error code to identify the type of error
  });
}
