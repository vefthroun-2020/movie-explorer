// Fetch calls return Promises
const moviePromise = fetch(
  "https://api.themoviedb.org/3/trending/movie/week?api_key=32d9721deb5480178c85e69cf5c335eb"
);

// When this promise gets resolved, do this
moviePromise
  .then(function (result) {
    // This transforms the result string into structured data
    return result.json();
  })
  .then(function (data) {
    // Received trending movie data
    console.log(data);

    const movies = data.results;
    renderMovies(movies);
  });

// A function "encapsulates" behavior
function renderMovies(movies) {
  // Clear movies container
  const moviesContainer = document.querySelector(".movies-container");
  moviesContainer.innerHTML = "";

  // Render each movie received via argument "movies" into movies container
  for (let movie of movies) {
    moviesContainer.innerHTML += `
    <div class="movie">
      <div class="poster-wrapper">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
      </div>

      <div>
        <h3>${movie.title}</h3>
        <div>
          <strong>Vote average:</strong> <span>${movie.vote_average}</span>
        </div>
      </div>
    </div>
    `;
  }
}

/* To be continued on next class :) */
// Log all movies and their vote averages
// movies.forEach(function (movie) {
//   console.log(movie.title, movie.vote_average);
// });

// function myForEach(myFunc) {
//   myFunc(123);
// }

// function testFunc(myNumber) {
//   console.log(myNumber);
// }

// myForEach(testFunc);
