const GOOGLE_API_KEY = "YOUR_API_KEY"; //PlacesAPI in GoogleApi
const YOUR_SIGNATURE = "YOUR_SIGNATURE"; //It is optional
export function getMapPreview(long, lat) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${long}&key=${GOOGLE_API_KEY}&signature=${YOUR_SIGNATURE}`;
  return imagePreviewUrl;
}

//Reverse GeoCoding APi
export async function getAddress(lat, long) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw Error("Failed to fetch address!");
  }
  const data = await response.json();
  const address = data.results[0].formatted_address;

  return address;
}

// {
// "results" : [
//   {
//      "address_components" : [
//         {
//            "long_name" : "277",
//            "short_name" : "277",
//            "types" : [ "street_number" ]
//         },
//         {
//            "long_name" : "Bedford Avenue",
//            "short_name" : "Bedford Ave",
//            "types" : [ "route" ]
//         },
//         {
//            "long_name" : "Williamsburg",
//            "short_name" : "Williamsburg",
//            "types" : [ "neighborhood", "political" ]
//         },
//         {
//            "long_name" : "Brooklyn",
//            "short_name" : "Brooklyn",
//            "types" : [ "sublocality", "political" ]
//         },
//         {
//            "long_name" : "Kings",
//            "short_name" : "Kings",
//            "types" : [ "administrative_area_level_2", "political" ]
//         },
//         {
//            "long_name" : "New York",
//            "short_name" : "NY",
//            "types" : [ "administrative_area_level_1", "political" ]
//         },
//         {
//            "long_name" : "United States",
//            "short_name" : "US",
//            "types" : [ "country", "political" ]
//         },
//         {
//            "long_name" : "11211",
//            "short_name" : "11211",
//            "types" : [ "postal_code" ]
//         }
//      ],
//      "formatted_address" : "277 Bedford Avenue, Brooklyn, NY 11211, USA",
//      "geometry" : {
//         "location" : {
//            "lat" : 40.714232,
//            "lng" : -73.9612889
//         },
//         "location_type" : "ROOFTOP",
//         "viewport" : {
//            "northeast" : {
//               "lat" : 40.7155809802915,
//               "lng" : -73.9599399197085
//            },
//            "southwest" : {
//               "lat" : 40.7128830197085,
//               "lng" : -73.96263788029151
//            }
//         }
//      },
//      "place_id" : "ChIJd8BlQ2BZwokRAFUEcm_qrcA",
//      "types" : [ "street_address" ]
//   },
