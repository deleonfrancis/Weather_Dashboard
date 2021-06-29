// For Google Auto Complete
$(document).ready(function () {
  google.maps.event.addDomListener(window, "load", initAutocomplete);

  $("#user-input").on("change", initAutocomplete);

  function initAutocomplete(event) {
    event.preventDefault();
    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("user-input"),
      {
        types: ["(regions)"],
      }
    );
  }
});
