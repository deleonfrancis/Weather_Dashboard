// Logic for the on click of search button

$(document).ready(function () {

  $("#weatherSearchBtn").on("click", function (event) {
    event.preventDefault();

    const userInput = $("#user-input").val().trim();
    getWeather(userInput);
  });

});
