var request = require('superagent')

if (process.argv.length < 4) {
  console.log('Need more arguments')
  process.exit()
}

/**
* Helper for opening_hours.
*/
function isOpenNow(o) {
  if (o.opening_hours) return (o.opening_hours.open_now) ? 'Yes' : 'No'
  else return 'Unknown'
}

request
  .get('https://maps.googleapis.com/maps/api/place/nearbysearch/json')
  .query({key: 'AIzaSyAHhBr5nn0FfdQzeQAHS5DEBDM9zYyn1DU'})
  .query({location: process.argv[3]})
  .query({radius: '50000'})
  .query({type: 'museum'})
  .end(function (error, result) {
    result.body.results.map(function(o, i) {
      if (o.vicinity.includes(process.argv[2])) {
        console.log(o.name + "... Open now: " + isOpenNow(o))
        console.log(o.geometry.location)
      }
    })
})
