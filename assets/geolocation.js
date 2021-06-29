// Logic for getting weather for nearby location
let button = document.getElementById("get-location");
let lat = "";
let long = "";

window.onload = function () {
  setLoading(true);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getGeoWeather, showError);
  } else {
    $("#error-display")
      .text("Geolocation is not supported by this browser.")
      .addClass("mt-5");
  }
};

button.addEventListener("click", geoErrorCheck);

function geoErrorCheck() {
  setLoading(true);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getGeoWeather, showError);
  } else {
    $("#error-display")
      .text("Geolocation is not supported by this browser.")
      .addClass("mt-5");
  }
}

function getGeoWeather(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  console.log(lat, long);
  getWeather(`${lat} ${long}`);
}

function showError(error) {
  setLoading(false);
  switch (error.code) {
    case error.PERMISSION_DENIED:
      $("#error-display")
        .text("Please verify 'Location Services' is on and try again.")
        .addClass("mt-5");
      break;
    case error.POSITION_UNAVAILABLE:
      $("#error-display")
        .text("Location information is unavailable.")
        .addClass("mt-5");
      break;
    case error.TIMEOUT:
      $("#error-display")
        .text("The request to get user location timed out.")
        .addClass("mt-5");
      break;
    case error.UNKNOWN_ERROR:
      $("#error-display").text("An unknown error occurred.").addClass("mt-5");
      break;
  }
}

function hideGeoErrors() {
  $("#error-display").text("");
  $("#error-display").addClass("hidden").removeClass("mt-5");
}
