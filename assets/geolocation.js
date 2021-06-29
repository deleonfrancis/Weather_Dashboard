const userInput = $("#user-input").val().trim();
let button = document.getElementById("get-location");
let displayError = document.getElementById("error-display");
let lat = "";
let long = "";

// Weather API key
const apiKeyWeatherAPI = "04fd0ca58baa4f0b836181340212806";

button.addEventListener("click", function () {
  setLoading(true);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getGeoWeather, showError);
  } else {
    $("#error-display")
      .text("Geolocation is not supported by this browser.")
      .addClass("mt-5");
  }
});

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
