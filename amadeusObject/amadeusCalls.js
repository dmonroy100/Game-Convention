const amadeusObject = require ('./app.js');

var amadeus = amadeusObject.getAmadeus;

exports.run = function (data){
amadeus.referenceData.urls.locations.airports.get({
  longitude: 49.0000,
  latitude: 2.55
});.then(function(response){
  console.log(response.body);   //=> The raw body
  console.log(response.result); //=> The fully parsed result
  console.log(response.data);   //=> The data attribute taken from the result
}).catch(function(error){
  console.log(error.response); //=> The response object with (un)parsed data
  console.log(error.response.request); //=> The details of the request made
  console.log(error.code); //=> A unique error code to identify the type of error
});
}
