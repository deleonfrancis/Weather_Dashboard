$(document).ready(function () {

  $("#weatherSearchBtn").on("click", function (event) {
    event.preventDefault();
    setLoading(true)
    hideGeoErrors()

    const userInput = $("#user-input").val().trim();
    getWeather(userInput);
  });

});
