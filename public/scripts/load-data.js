function loadData() {
     loadJSON(JSON_FILE, function (response) {
        console.log('response',response)
        DATA = response;
})
    
}