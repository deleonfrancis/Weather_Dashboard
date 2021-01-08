// "use strict";

// Use jQuery
$(document).ready(function () {
  var currentDate = moment().format("L");

  // Target the submitBtn
  $("#submitBtn").on("click", function (event) {
    event.preventDefault();

    // gets the user input and store it as a variable
    var userSearch = $("#user-search").val().trim();

    // gets the weather data for the user input
    weather(userSearch);
  });

  // Variable that hold's key
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
        var tempInF = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(0);

        // to temperature, humidity, wind speed on the page
        $("#cityName").text(response.name + " (" + currentDate + ")");
        $("#temp").text(tempInF);
        $("#humid").text(response.main.humidity);
        $("#wind").text(response.wind.speed);

        // variable for Lat
        var lat = response.coord.lat;
        var lon = response.coord.lon;

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
            $("#uv").removeClass("hidden");
            $("#uv").text(response2.value);
          },
        });

        // Get icon
        var todayIconLocation = response.weather[0].icon;
        var todayIconURL =
          "https://openweathermap.org/img/wn/" + todayIconLocation + "@2x.png";

        // Put icon on the page
        var todayIconImage = $("<img>");
        todayIconImage.attr("src", todayIconURL);
        $("#today-icon").html(todayIconImage);

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
            var day1 = moment().add(1, "days").format("L");
            $("#day1").text(day1);
            $("#temp1").text(response3.list[1].main.temp.toFixed(0));
            $("#humid1").text(response3.list[1].main.humidity);
            $("");
            // Icon for Day 1
            var iconDay1Location = response3.list[1].weather[0].icon;
            var iconDay1Url =
              "https://openweathermap.org/img/wn/" + iconDay1Location + ".png";

            var iconImageDay1 = $("<img>");
            iconImageDay1.attr("src", iconDay1Url);
            $("#icon-day1").html(iconImageDay1);

            // Day Two
            var day2 = moment().add(2, "days").format("L");
            $("#day2").html(day2);
            $("#temp2").text(response3.list[8].main.temp.toFixed(0));
            $("#humid2").text(response3.list[8].main.humidity);
            // Icon for Day 2
            var iconDay2Location = response3.list[8].weather[0].icon;
            var iconDay2Url =
              "https://openweathermap.org/img/wn/" + iconDay2Location + ".png";

            var iconImageDay2 = $("<img>");
            iconImageDay2.attr("src", iconDay2Url);
            $("#icon-day2").html(iconImageDay2);

            // Day Three
            var day3 = moment().add(3, "days").format("L");
            $("#day3").html(day3);
            $("#temp3").text(response3.list[16].main.temp.toFixed(0));
            $("#humid3").text(response3.list[16].main.humidity);
            // Icon for Day 3
            var iconDay3Location = response3.list[16].weather[0].icon;
            var iconDay3Url =
              "https://openweathermap.org/img/wn/" + iconDay3Location + ".png";

            var iconImageDay3 = $("<img>");
            iconImageDay3.attr("src", iconDay3Url);
            $("#icon-day3").html(iconImageDay3);

            // Day Four
            var day4 = moment().add(4, "days").format("L");
            $("#day4").html(day4);
            $("#temp4").text(response3.list[24].main.temp.toFixed(0));
            $("#humid4").text(response3.list[24].main.humidity);
            // Icon for Day 4
            var iconDay4Location = response3.list[24].weather[0].icon;
            var iconDay4Url =
              "https://openweathermap.org/img/wn/" + iconDay4Location + ".png";

            var iconImageDay4 = $("<img>");
            iconImageDay4.attr("src", iconDay4Url);
            $("#icon-day4").html(iconImageDay4);

            // Day Five
            var day5 = moment().add(5, "days").format("L");
            $("#day5").html(day5);
            $("#temp5").text(response3.list[32].main.temp.toFixed(0));
            $("#humid5").text(response3.list[32].main.humidity);
            // Icon for Day 5
            var iconDay5Location = response3.list[32].weather[0].icon;
            var iconDay5Url =
              "https://openweathermap.org/img/wn/" + iconDay5Location + ".png";

            var iconImageDay5 = $("<img>");
            iconImageDay5.attr("src", iconDay5Url);
            $("#icon-day5").html(iconImageDay5);
          },
        });
      },
    });
  }

  //  Write code to save userSearch in local storage and put it on the page
  // ....
});
