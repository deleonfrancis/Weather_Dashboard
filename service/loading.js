function setLoading(bool) {
  if (bool === true) {
    hideGeoErrors()
    $("#loader").removeClass("hidden");
    hideData()
  }else{
    $("#loader").addClass("hidden");
  }
}
