$(document).ready(function () {
  const apiKeyWeatherAPI = "04fd0ca58baa4f0b836181340212806";

  $("#weatherSearchBtn").on("click", function (event) {
    event.preventDefault();
    console.log("weather btn clicked")
    // Remove Error Messages 
    $("#error-display").text("")
    $("#error-display").addClass("hidden").removeClass("mt-5")

    const userInput = $("#user-input").val().trim();
    getWeather(userInput);
  });

  const getWeather = (userInput) => {
    $.ajax({
        method: "GET",
        url: `http://api.weatherapi.com/v1/current.json?key=${apiKeyWeatherAPI}&q=${userInput}&aqi=no`,
        datatype: "json",
        success: function (res) {
            console.log(res)
        }
    })
  }

});
