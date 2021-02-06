// Creating map object
var myMap = L.map("map", {
  center: [41.88, -87.63],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);
// Store API query variables
var baseURL = "https://data.cityofchicago.org/resource/hec5-y4x5.json?";
var date = "$where=creation_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
// var complaint = "&complaint_type=Rodent";
var limit = "&$limit=100&$offset=100";
// Assemble API query URL
var url = baseURL + date +  limit;
console.log(url)
// Grab the data with d3
d3.json(url, function(response) {
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  // Loop through data
  for (var i = 0; i < response.length; i++) {
    // Set the data location property to a variable
    var location = response[i].location;
    //console.log(location)
    // Check for location property
    if (location) {
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.latitude, location.longitude])
        .bindPopup("<h1>" + response[i].type_of_service_request +"</h1><hr><h2>" + response[i].street_address + "</h2><h3>" + response[i].what_type_of_surface_is_the_graffiti_on_ + "</h3>")
        );
    }
  }
  // Add our marker cluster layer to the map
  myMap.addLayer(markers);
});