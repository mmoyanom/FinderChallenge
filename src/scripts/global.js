/*
  constants and global functions
*/

var JSON_FILE = '/books-schema.json';
var DATA;
var PAGE = 0;
var FILTERED_BOOKS;
var AFTER_QUERY_BOOKS;
/*
 @method loadJSON
 source: https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
*/
var loadJSON = function (url, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", url, true);
    xobj.onreadystatechange = function (responseText) {
        if (xobj.readyState == 4 && xobj.status == "200") {
            var content = JSON.parse(xobj.responseText);
            callback.call(this, content);
        }
    };
    xobj.send(null);
};

var generateFilterUri = function (filters) {
    let uriFilter = "";
    let extraFilters = "";
    Object.keys(filters).forEach((filter) => {
        //console.log('global filters ', filter);
        if (filters[filter] !== null)
            if (uriFilter.length === 0)
                uriFilter += filters[filter];
            else
                uriFilter += '-' + filters[filter];
    })

    return uriFilter + extraFilters;
}
var searchIdFilter = function (filterType, filterKey, entities) {
    return entities[filterType][0][filterKey].id
}
var loadFiltersUrl = function (url, entities) {
    let filtersStr = url.substring(url.indexOf("#/") + 2, url.indexOf('?') === -1 ? url.length : url.indexOf('?'));
    //console.log('DATA GLOBAL ', DATA);
    let filters = {
        category: null,
        lang: null,
        edition: null,
        time: null
    }
    filtersStr.split('-').forEach((item) => {
        if (Object.keys(entities.categories[0]).some((c) => { return c === item; })) {
            filters.category = item;
        } else if (Object.keys(entities.edition[0]).some((e) => { return e === item })) {
            filters.edition = item;
        } else if (Object.keys(entities.lang[0]).some((l) => { return l === item })) {
            filters.lang = item
        } else if (['today', 'week', 'month', 'year'].some((t) => { return t === item })) {
            filters.time = item;
        }
    })
    return filters;
}


var printBooks = function (Books = FILTERED_BOOKS, Page = PAGE) {
    $('#content-books').empty();
    if (Books.length === 0) {
        $('#content-books').append('<h2 style="text-align:center">No hay resultados</h2>')
    }
    Books = Books.slice(Page * 9, Page * 9 + 9);

    Books.forEach((book) => {
        $('#content-books').append(`<div class="book-item pure-u-7-24"><div class="book-img"><img src="${book.image}"/></div><h3>${book.title}</h3><p class="book-description">${book.teaser}</p></div>`)
    })
}
var changePage = function (type, query = false) {
    if (type === 'back') {
        PAGE = PAGE - 1;
    } else {
        PAGE = PAGE + 1;
    }
    console.log(PAGE);
    printBooks(FILTERED_BOOKS);
    printPages(FILTERED_BOOKS);
    if (query) {
        printBooks(AFTER_QUERY_BOOKS);
        printPages(AFTER_QUERY_BOOKS);
    }
}
var printPages = function (Books) {
    let pages = "";
    let countPages = Math.ceil(Books.length / 9);
    console.log('countPages', countPages)
    if (PAGE > 0) {
        pages += "<a class='pageBackwards'>Anterior</a>";
    }
    pages += " | ";
    if (PAGE < countPages - 1) {
        pages += "<a class='pageForward'>Siguiente</a>";
    }

    $('#pages').empty().append(pages);
}





var filterBooks = function () {

    let filters = loadFiltersUrl(location.href, DATA.entities);


    FILTERED_BOOKS = DATA.data.filter((book) => {
        let existCategory = false;
        let existLang = false;
        let existEdition = false;
        let existTime = false;
        if (book.categories.some((c) => { return c === filters.category })) {
            existCategory = true;
        } else if (filters.category === null) {
            existCategory = true;
        } else {
            existCategory = false;
        }

        if (filters.lang === null) {
            existLang = true;
        } else if (book.lang.some((l) => { return l === searchIdFilter('lang', filters.lang, DATA.entities) })) {
            existLang = true;
        } else {
            existLang = false;
        }

        if (filters.edition === null) {
            existEdition = true;
        } else if (book.mode.some((e) => { return e === searchIdFilter('edition', filters.edition, DATA.entities) })) {
            existEdition = true;
        } else {
            existEdition = false;
        }

        if (filters.time === null) {
            existTime = true;
        } else {
            let timePublish = new Date(book.date_pub);
            let today = new Date();
            let timeDiff = today.getTime() - timePublish.getTime();
            var days = Math.ceil(timeDiff / (1000 * 3600 * 24));
            //Show books published that where published today, more than a week, more than a mont or more than a year
            switch (filters.time) {
                case 'today':
                    if (days >= 0 && days <= 1) {
                        existTime = true;
                    } else {
                        existTime = false;
                    }
                    break;
                case 'week':
                    if (days >= 7) {
                        existTime = true;
                    } else {
                        existTime = false;
                    }
                    break;
                case 'month':
                    if (days >= 30) {
                        existTime = true;
                    } else {
                        existTime = false;
                    }
                    break;
                case 'year':
                    if (days >= 365) {
                        existTime = true;
                    } else {
                        existTime = false;
                    }
                    break;
            }
        }

        if (existCategory && existLang && existEdition && existTime) {
            return true;
        } else {
            return false;
        }
    });
    PAGE = 0;
    printBooks(FILTERED_BOOKS);
    printPages(FILTERED_BOOKS);
    $(window).scrollTop(0);
}

var searchOnFilteredBooks = function (query) {
    PAGE = 0;
    AFTER_QUERY_BOOKS = FILTERED_BOOKS.filter((book) => {
        if (book.title.toLowerCase().indexOf(query.toLowerCase()) > -1 || query.length === 0) {
            return true;
        } else {
            return false;
        }

    })
    printBooks(AFTER_QUERY_BOOKS);
    printPages(AFTER_QUERY_BOOKS);
    $(window).scrollTop(0);
}