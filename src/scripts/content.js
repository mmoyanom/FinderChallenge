
$(function () {

    $(window).on('hashchange', function () {
        filterBooks();

        $('#saved a').removeClass('disableClick');
        let filterUri = location.href.substring(location.href.indexOf('#/') + 2);
        //Se tiene que reemplazar los valores de los saved en el json. O incluir ingles en el key de los idiomas ya que no hay como comparar.
        $('#saved a[href="/#/' + filterUri.replace(/ENG/, 'ingles').replace(/comedy/, 'comedia') + '"]').addClass('disableClick');
    });

})