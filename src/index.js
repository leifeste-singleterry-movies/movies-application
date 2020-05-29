/**
 * es6 modules and imports
 */
const $ = require('jquery')
// import sayHello from './hello';
//
// sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {

    // addNewMovie("Tombstone", "5", 3, movies);
    // console.log('Here are all the movies:');
    // $('#loading').text('');
    // $('#loading').text(`Here are all the movies:`);
    // movies.forEach(({title, rating, id}) => {
    //   // console.log(`id#${id} - ${title} - rating: ${rating}`);
    //   $('.container').append(`<div id="movies">${title} - rating: ${rating}</div>`)
    // });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});

// === This function adds a new movie to object/array ===
function addNewMovie(title, rating, obj) {
    let newMovie = {
        "title": title,
        "rating": rating
    }
    obj.push(newMovie);
}

function deleteData(item, url) {
    return fetch(url + '/' + item, {
        method: 'delete'
    })
        .then(response => response.json());
}

// === Ajax request that gets movies object ===
$.ajax('/api/movies').done(function (data) {
    $('#loading').text(`Here are all the movies:`);
    data.forEach(({title, rating, id}, i) => {
        // console.log(i);
        $('.container').append(`<div class="${i}">${title} - rating: ${rating} <button id="${i}" data-id="${id}">Delete</button></div>`)
    });
    // This gets movie info from inputs and uses the function to add to movies object
    // $('button').click(function(e) {
    //   e.preventDefault();
    //   $('.movies').html('');
    //   $('#loading').text(`Here are all the movies:`);
    //   addNewMovie($('#movie-title').val(), $('#movie-rating').val(), data);
    //   data.forEach(({title, rating}) => {
    //     $('.container').append(`<div class="movies">${title} - rating: ${rating}</div>`)
    //   });
    // });
}).done(function (data) {
    data.forEach((movie, i) => {
        console.log(movie, i);
        $(`#${i}`).click(function (e) {
            e.preventDefault();
            console.log($(`.${i}`).text(), movie.id);
            $.ajax(`/api/movies/${movie.id}`, {type: "DELETE"});
            $.ajax('/api/movies').done(function (input) {
            $('.container').html('');
                $('#loading').html(`<h1 id="loading">Here are all the movies:</h1>`);
                input.forEach(({title, rating, id}, i) => {
                    // console.log(i);
                    $('.container').append(`<div class="${i}">${title} - rating: ${rating} <button id="${i}" data-id="${id}">Delete</button></div>`)


                })
            });

            // refreshMovies(data);
        });
    });
});

function refreshMovies(input) {
    $('.container').html('')
    input.forEach(({title, rating, id}, i) => {
        // console.log(input);
        $('.container').append(`<div class="${i}">${title} - rating: ${rating} <button id="${i}" data-id="${id}">Delete</button></div>`)
    });
}

// === button to update movies
$('button').click(function (e) {
    e.preventDefault();
    $.post('/api/movies', {
        "title": $('#movie-title').val(),
        "rating": $('#movie-rating').val()
    });

    $.ajax('/api/movies').done(function (data) {
        // console.log(data.length);
        $('.container').append(`<div class="${data.length - 1}">${$('#movie-title').val()} - rating: ${$('#movie-rating').val()} <button id="${data.length - 1}">Delete</button></div>`)
    }).done(function (data) {
        $(`#${data.length - 1}`).click(function (e) {
            e.preventDefault();
            console.log($(`.${data.length - 1}`).text());
        });
    });
});

// console.log(data);




