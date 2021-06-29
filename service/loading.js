function setLoading(bool) {
  if (bool === true) {
    $("#error-display").text("");
    $("#error-display").addClass("hidden").removeClass("mt-5");
    $("#loader").removeClass("hidden");
    hideData()
  }else{
    $("#loader").addClass("hidden");
  }
}
