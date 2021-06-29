$(document).ready(function () {
  const apiKeyWeatherAPI = "04fd0ca58baa4f0b836181340212806";

  $("#weatherSearchBtn").on("click", function (event) {
    event.preventDefault();
    setLoading(true)
    // Remove Error Messages 
    $("#error-display").text("")
    $("#error-display").addClass("hidden").removeClass("mt-5")

    const userInput = $("#user-input").val().trim();
    getWeather(userInput);
  });

});
