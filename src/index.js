/**
 * es6 modules and imports
 */
const $ = require('jquery')
import sayHello from './hello';

sayHello('World');

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

// === Ajax request that gets movies object ===
$.ajax('/api/movies').done(function (data) {
    $('#loading').text(`Here are all the movies:`);
    data.forEach(({title, rating}) => {
        $('.container').append(`<div class="movies">${title} - rating: ${rating} </div><button class="delete">Delete</button>`)
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

});

$('.delete').click(function (e) {
  e.preventDefault();
  console.log($('.movies').text());

});


$('button').click(function (e) {
    e.preventDefault();
    $.post('/api/movies', {
        "title": $('#movie-title').val(),
        "rating": $('#movie-rating').val()
    });
    $('.container').append(`<div class="movies">${$('#movie-title').val()} - rating: ${$('#movie-rating').val()} </div>`)
});






