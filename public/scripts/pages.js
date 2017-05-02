$(function () {

    $('#pages').delegate('.pageBackwards', 'click', function () {
        if ($('#searchText').val().length > 0)
            changePage('back', true);
        else
            changePage('back', false)


    })
    $('#pages').delegate('.pageForward', 'click', function () {
        if ($('#searchText').val().length > 0)
            changePage('forward', true);
        else
            changePage('forward', false)
    })
})