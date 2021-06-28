const userInput = $("#user-input").val().trim();
let button = document.getElementById("get-location");
let displayError = document.getElementById("error-display");
let lat = "";
let long = "";
const currentDate = moment().format("L");

// Weather API key
var apiKeyOW = "&appid=b9a7791a6cf8d58430d53a8881a685bc";
const apiKeyWeatherAPI = "04fd0ca58baa4f0b836181340212806";

button.addEventListener("click", function () {
  $("#error-display").text("");
  $("#error-display").addClass("hidden").removeClass("mt-5");
  $("#loader").removeClass("hidden");
  $("#city-current-weather").addClass("hidden");
  $("#5-day-weather").addClass("hidden");
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
  geolocationWeather(`${lat} ${long}`);
  $("#loader").addClass("hidden");
}

function showError(error) {
  $("#loader").addClass("hidden");

  switch (error.code) {
    case error.PERMISSION_DENIED:
      $("#error-display")
        .text(
          "User denied the request for Geolocation. Please ensure that your browser 'Location Services' is turned on and try again."
        )
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

function geolocationWeather(input) {
  $.ajax({
    method: "GET",
    url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKeyWeatherAPI}&q=${input}&days=3&aqi=yes&alerts=yes`,
    // url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKeyWeatherAPI}&q=${lat}${long}&days=3&aqi=yes&alerts=yes`,

    datatype: "json",
    success: function (response) {
      $("#city-current-weather").removeClass("hidden");
      $("#uv").removeClass("hidden");
      $("#3-day-weather").removeClass("hidden");

      console.log(response);

      const city = response.location.name;
      const state = response.location.region;
      const country = response.location.country;

      const temp = Math.round(response.current.temp_f);
      const feels_like = Math.round(response.current.feelslike_f);
      const highTemp = Math.round(
        response.forecast.forecastday[0].day.maxtemp_f
      );
      const lowTemp = Math.round(
        response.forecast.forecastday[0].day.mintemp_f
      );

      const humidity = Math.round(response.current.humidity);

      const uv = response.forecast.forecastday[0].day.uv;

      const icon = response.forecast.forecastday[0].day.condition.icon;

      const windSpeed = response.current.wind_mph;
      const windDir = response.current.wind_dir;
      const windDegree = response.current.wind_degree;

      const sunrise = response.forecast.forecastday[0].astro.sunrise;
      const sunset = response.forecast.forecastday[0].astro.sunset;

      const chanceOfRain =
        response.forecast.forecastday[0].day.daily_chance_of_rain;

      const description = response.forecast.forecastday[0].day.condition.text;
      let arrayDescription = description.split(" ");
      let capDescription = "";
      for (let i = 0; i < arrayDescription.length; i++) {
        arrayDescription[i] =
          arrayDescription[i][0].toUpperCase() + arrayDescription[i].substr(1);
        capDescription = arrayDescription.join(" ");
      }

      if (country === "United States of America") {
        $("#cityName").text(`${city}, ${state}`);
      } else {
        $("#cityName").text(`${city}, ${state} ,${country}`);
      }

      $("#weather-desc").text(capDescription);
      $("#temp").text(`${temp}°`);
      $("#feelsLike").text(feels_like);
      $("#highTemp").text(highTemp);
      $("#lowTemp").text(lowTemp);
      $("#humid").text(humidity);
      $("#windSpeed").text(windSpeed);
      $("#windDir").text(`${windDir}, ${windDegree}`);
      $("#uv").text(uv);

      // Put icon on the page
      const todayIconImage = $("<img>");
      todayIconImage.attr("src", icon);
      $("#today-icon").html(todayIconImage);

      ///////////////   3 Day Weather

      // Day One
      const day1 = response.forecast.forecastday[1];
      const date = day1.date;
      const maxTemp1 = day1.day.maxtemp_f;
      const minTemp1 = day1.day.mintemp_f;
      const avgHumidity1 = day1.day.avghumidity;
      const chance_of_rain1 = day1.day.daily_chance_of_rain;

      $("#day1").text(date);
      $("#maxTemp1").text(maxTemp1.toFixed(0));
      $("#minTemp1").text(minTemp1.toFixed(0));
      $("#humid1").text(avgHumidity1);
      $("#rainChance1").text(chance_of_rain1);


      // Icon for Day 1
      const iconDay1Url = day1.day.condition.icon;
      const iconImageDay1 = $("<img>");
      iconImageDay1.attr("src", iconDay1Url);
      $("#icon-day1").html(iconImageDay1);

      // Day Two
      const day2 = response.forecast.forecastday[2];
      const date2 = day2.date;
      const maxTemp2 = day2.day.maxtemp_f;
      const minTemp2 = day2.day.mintemp_f;
      const avgHumidity2 = day2.day.avghumidity;
      const chance_of_rain2 = day2.day.daily_chance_of_rain;

      $("#day2").text(date2);
      $("#maxTemp2").text(maxTemp2.toFixed(0));
      $("#minTemp2").text(minTemp2.toFixed(0));
      $("#humid2").text(avgHumidity2);
      $("#rainChance2").text(chance_of_rain2);

      // Icon for Day 2
      const iconDay1Url2 = day2.day.condition.icon;
      const iconImageDay2 = $("<img>");
      iconImageDay2.attr("src", iconDay1Url2);
      $("#icon-day2").html(iconImageDay2);

      // Day Three
      const day3 = response.forecast.forecastday[2];
      const date3 = day3.date;
      const maxTemp3 = day3.day.maxtemp_f;
      const minTemp3 = day3.day.mintemp_f;
      const avgHumidity3 = day3.day.avghumidity;
      const chance_of_rain3 = day3.day.daily_chance_of_rain;

      $("#day3").text(date3);
      $("#maxTemp3").text(maxTemp3.toFixed(0));
      $("#minTemp3").text(minTemp3.toFixed(0));
      $("#humid3").text(avgHumidity3);
      $("#rainChance3").text(chance_of_rain3);

      // Icon for Day 3
      const iconDay1Url3 = day3.day.condition.icon;
      const iconImageDay3 = $("<img>");
      iconImageDay3.attr("src", iconDay1Url3);
      $("#icon-day3").html(iconImageDay3);

    },
  });
}
