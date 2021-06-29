// Logic for Google Auto Complete

let autocomplete;

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("user-input"),
    {
      types: ["(regions)"],
    }
  );
  autocomplete.addListener("place_changed", onPlaceChanged);
}

function onPlaceChanged() {
  let place = autocomplete.getPlace();

  if (!place.geometry) {
    document.getElementById("user-input").placeholder = "Enter a place";
  } else {
    getWeather(place.formatted_address)
  }
}
