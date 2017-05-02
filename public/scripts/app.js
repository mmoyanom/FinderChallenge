/*
  main script for only runs every function
*/

loadJSON(JSON_FILE, function (response) {
  DATA = response;
  filterBooks(DATA.data)
})