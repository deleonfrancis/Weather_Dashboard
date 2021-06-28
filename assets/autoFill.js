$(document).ready(function () {
  google.maps.event.addDomListener(window, "load", initAutocomplete);

  $("#user-input").on("change", async function (event) {
    event.preventDefault();

    await initAutocomplete();
  });

  function initAutocomplete() {
    const map = new google.maps.places.Autocomplete(document.getElementById("user-input"), {
      types: ["(regions)"],
    //   componentRestrictions: { "country": ["AU"] },
    //   fields: ["places_id", "geometry", "name"],
    });
  }
});
