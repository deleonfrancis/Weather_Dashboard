$(document).ready(function () {
  google.maps.event.addDomListener(window, "load", initAutocomplete);

  $("#user-input").on("change", function (event) {
    event.preventDefault();

    initAutocomplete();
  });

  function initAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("user-input"),
      {
        types: ["(regions)"],
        //   componentRestrictions: { "country": ["AU"] },
        //   fields: ["places_id", "geometry", "name"],
      }
    );

    // autocomplete.addListener("placed_changed", onPlaceChanged);
  }
});

// function onPlaceChanged() {
//   console.log('placeChanged')
//   let place = autocomplete.getPlace();
//   if (!place.geometry) {
//     document.getElementById("user-input").placeholder = "Enter a place";
//   } else {
//     document.getElementById('user-input').innerHTML = place.name
//   }
//   getWeather(place.name)
// }
