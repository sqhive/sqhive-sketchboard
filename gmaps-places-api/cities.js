var request = require('superagent')

if (process.argv.length < 3) {
	console.log('Need more arguments')
	process.exit()
}

/**
 * Get details
 * @param  {String}   place_id  The Google PlaceId identifier.
 * @param  {Function} callback  The function to call on complete.
 */
function get_details(place_id, callback) {
  request
   .get('https://maps.googleapis.com/maps/api/place/details/json')
   .query({key: 'AIzaSyAHhBr5nn0FfdQzeQAHS5DEBDM9zYyn1DU'})
   .query({placeid: place_id})
   .end(callback)
}

request
 .get('https://maps.googleapis.com/maps/api/place/autocomplete/json')
 .query({key: 'AIzaSyAHhBr5nn0FfdQzeQAHS5DEBDM9zYyn1DU'})
 .query({input: process.argv[2]})
 .query({types: '(cities)'})
 .query({components: 'country:uk'})
 .end(function (error, result) {
	result.body.predictions.map(function(o, i) {
    get_details(o.place_id, function (e, r) {
      console.log(o.description)
      console.log(r.body.result.geometry.location)
    })
	})
})
