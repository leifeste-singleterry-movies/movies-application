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

  // console.log('Here are all the movies:');
  // $('#loading').text('');
  $('#loading').text(`Here are all the movies:`);
  movies.forEach(({title, rating, id}) => {
    // console.log(`id#${id} - ${title} - rating: ${rating}`);
    $('.container').append(`<div id="movies">${title} - rating: ${rating}</div>`)
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});


