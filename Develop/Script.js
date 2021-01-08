"use strict";

// Use jQuery
$(document).ready(function () {
  var currentDate = moment().format("L");
  // Target the submitBtn
  $("#submitBtn").on("click", function (event) {
    event.preventDefault();

    // gets the user input and store it as a variable
    let userSearch = $("#user-search").val();

    storeCityName(userSearch);
    localStorage.setItem("city", JSON.stringify("cities"));

    // console.log("You saved " + storeCityName(userSearch));
    var query = localStorage.getItem("city") || "Orlando";

    // turns user input into a string
    $("#user-search").val();

    // gets the weather data for the user input
    weather(userSearch);
  });
  var apiKey = "&appid=b9a7791a6cf8d58430d53a8881a685bc";

  // function that gets the info from the API
  function weather(userSearch) {
    $.ajax({
      method: "GET",
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        userSearch +
        apiKey,
      datatype: "json",
      success: function (response) {
        // converts K to F
        let tempInF = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(0);

        // to temperature, humidity, wind speed on the page
        $("#cityName").text(response.name + " (" + currentDate + ")");
        $("#temp").text(tempInF);
        $("#humid").text(response.main.humidity);
        $("#wind").text(response.wind.speed);

        // variable for Lat
        let lat = response.coord.lat;
        let lon = response.coord.lon;

        // api for UVI
        $.ajax({
          method: "GET",
          url:
            "http://api.openweathermap.org/data/2.5/uvi?lat=" +
            lat +
            "&lon=" +
            lon +
            apiKey,
          datatype: "json",
          success: function (response2) {
            // print UVI on page
            $("#uv").text(response2.value);
          },
        });

        // api for 5 Day weather
        $.ajax({
          method: "GET",
          url:
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            userSearch +
            "&units=imperial" +
            apiKey,
          datatype: "json",
          success: function (response3) {
            console.log(response3);
            // Day One
            let day1 = moment().add(1, "days").format("L");
            $("#day1").text(day1);
            $("#temp1").text(response3.list[1].main.temp.toFixed(0));
            $("#humid1").text(response3.list[1].main.humidity);

            // Day Tow
            let day2 = moment().add(2, "days").format("L");
            $("#day2").html(day2);
            $("#temp2").text(response3.list[8].main.temp.toFixed(0));
            $("#humid2").text(response3.list[8].main.humidity);

            // Day Three
            let day3 = moment().add(3, "days").format("L");
            $("#day3").html(day3);
            $("#temp3").text(response3.list[16].main.temp.toFixed(0));
            $("#humid3").text(response3.list[16].main.humidity);

            // Day Four
            let day4 = moment().add(4, "days").format("L");
            $("#day4").html(day4);
            $("#temp4").text(response3.list[24].main.temp.toFixed(0));
            $("#humid4").text(response3.list[24].main.humidity);

            // Day Five
            let day5 = moment().add(5, "days").format("L");
            $("#day5").html(day5);
            $("#temp5").text(response3.list[32].main.temp.toFixed(0));
            $("#humid5").text(response3.list[32].main.humidity);
          },
        });
      },
    });
  }
  // Function that will store city name to the local storage
  function storeCityName(cityName) {
    localStorage.setItem("city", cityName);
  }
  // create a Variable called currentDate and set it equal to moment API
  // Make format support multiple locations
  // var currentDate = moment().format("L");

  // Create a variable that stores my open weather map api key
});
