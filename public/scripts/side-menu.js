$(function () {
    var filters;
    loadJSON(JSON_FILE, function (response) {
        DATA = response;
        filters = loadFiltersUrl(location.href, DATA.entities);
        loadFiltersUrl(location.href, DATA.entities);
        var Categories = DATA.entities.categories[0];
        var Lang = DATA.entities.lang[0];
        var Editions = DATA.entities.edition[0];
        var Saved = DATA.entities.saved;
        var Time = ["today", "week", "month", "year"];
        Object.keys(Categories).forEach((categoria) => {
            $('#categorias').append(`<li><a type="filter" filter="categories" data-filter="${categoria}" href="#/${categoria}">${Categories[categoria].label}</a></li>`)
        });
        if (filters.category !== null) {
            $('a[filter="categories"][data-filter="' + filters.category + '"]').trigger('click');
        }
        Object.keys(Lang).forEach((lang) => {
            $('#idioma').append(`<li><a type="filter" filter="lang" data-filter="${lang}" href="#/${lang}">${Lang[lang].label}</a></li>`)
        });
        if (filters.Lang !== null) {
            $('a[filter="lang"][data-filter="' + filters.lang + '"]').trigger('click');
        }
        Object.keys(Editions).forEach((edition) => {
            $('#presentacion').append(`<li><a type="filter" filter="edition" data-filter="${edition}" href="#/${edition}">${Editions[edition].label}</a></li>`)
        });
        if (filters.edition !== null) {
            $('a[filter="edition"][data-filter="' + filters.edition + '"]').trigger('click');
        }
        Object.keys(Saved).forEach((s) => {
            $('#saved').append(`<li><a type="saved" href="${Saved[s].url}">${Saved[s].label}</a></li>`)
        });
        if (filters.time !== null) {
            $('a[filter="time"][data-filter="' + filters.time + '"]').trigger('click');
        }
        let filterUri = location.href.substring(location.href.indexOf('#/') + 2);
        //Se tiene que reemplazar los valores de los saved en el json. O incluir ingles en el key de los idiomas ya que no hay como comparar.
        $('#saved a[href="/#/' + filterUri.replace(/ENG/, 'ingles').replace(/comedy/, 'comedia') + '"]').addClass('disableClick');
    })

    $('.filters').delegate('a[type="saved"]', 'click', function (e) {
        e.preventDefault();
        let href = $(this).attr('href').replace(/comedia/g, 'comedy').replace(/ingles/g, 'ENG');
        console.log('href replaced', href);
        window.location.href = href;
        location.reload();
    })

    $('.filters').delegate('a[type="filter"]', 'click', function (e) {

        $('#searchText').val("");
        e.preventDefault();
        let filterType = $(this).attr('filter');

        switch (filterType) {
            case 'categories':
                $('a[filter="categories"]').removeClass('disableClick');
                filters.category = $(this).attr('data-filter') === 'all' ? null : $(this).attr('data-filter');
                $(this).addClass('disableClick');
                break;
            case 'lang':
                $('a[filter="lang"]').removeClass('disableClick');
                filters.lang = $(this).attr('data-filter') === 'all' ? null : $(this).attr('data-filter');
                $(this).addClass('disableClick');
                break;
            case 'edition':
                $('a[filter="edition"]').removeClass('disableClick');
                filters.edition = $(this).attr('data-filter') === 'all' ? null : $(this).attr('data-filter');
                $(this).addClass('disableClick');
                break;
            case 'time':
                $('a[filter="time"]').removeClass('disableClick');
                filters.time = $(this).attr('data-filter') === 'all' ? null : $(this).attr('data-filter');
                $(this).addClass('disableClick');
                break;
        }
        let filtersUri = generateFilterUri(filters);
        location.href = '#/' + filtersUri;


    })



})