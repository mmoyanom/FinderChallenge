

$(function () {

    $('#searchForm').submit(function (e) {
        e.preventDefault();
        searchOnFilteredBooks($('#searchText').val())
    });

    $('#searchForm').on('keypress', function (e) {
        console.log(e.keyCode);// 8 32 13 
        if (e.altKey) {
            e.preventDefault();
            return false;
        } else
            if (e.keyCode >= 97 && e.keyCode <= 122 || e.keyCode === 241 || e.keyCode === 209 || e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode === 8 || e.keyCode === 192 || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode === 13 || e.keyCode === 32) {
                return true;
            } else {
                e.preventDefault;
                return false;
            }
    });



})

