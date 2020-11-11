// All movies
let movies = [];

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
    movies = data.results;
    renderMovies(movies);
  });

// Get all genres
fetch(
  "https://api.themoviedb.org/3/genre/movie/list?api_key=32d9721deb5480178c85e69cf5c335eb"
)
  .then((result) => result.json())
  .then((data) => {
    const controlsContainer = document.querySelector(".controls-container");
    const genres = data.genres;
    const selectEl = document.createElement("select");

    // Filter movies according to the selected genre
    selectEl.addEventListener("change", function () {
      const genreIdStr = selectEl.selectedOptions[0].value;
      const genreId = parseInt(genreIdStr);

      renderMoviesInGenre(movies, genreId);
    });

    const genresOptions = genres.map((genre) => {
      return `<option value="${genre.id}">${genre.name}</option>`;
    });

    selectEl.innerHTML = "<option>Select genre...</option>";
    selectEl.innerHTML += genresOptions.join("");
    controlsContainer.appendChild(selectEl);
  });

// A function "encapsulates" behavior
function renderMovies(movies) {
  // Clear movies container
  const moviesContainer = document.querySelector(".movies-container");
  moviesContainer.innerHTML = "";

  // Render each movie received via argument "movies" into movies container

  // Create an array with all movies templates
  const movieDivs = movies.map(function (movie) {
    let moviePoster;
    if (movie.poster_path) {
      moviePoster = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />`;
    } else {
      moviePoster = `<p>Image not found</p>`;
    }

    return `
    <div class="movie">
      <div class="poster-wrapper">
        ${moviePoster}
      </div>

      <div>
        <h3>${movie.title}</h3>
        <div>
          <strong>Vote average:</strong> <span>${movie.vote_average}</span>
        </div>
      </div>
    </div>
    `;
  });

  // Join all div templates with not space in between
  // and add result as the movie container HTML
  moviesContainer.innerHTML = movieDivs.join("");
}

// Show movies by genre
function renderMoviesInGenre(movies, genreId) {
  // Select all movies in case there's an error with genreId
  if (!genreId) {
    renderMovies(movies);
    return;
  }

  const filteredMovies = movies.filter((movie) => {
    // Does the passed in genreId
    if (movie.genre_ids.includes(genreId)) {
      return true;
    } else {
      return false;
    }
  });

  renderMovies(filteredMovies);
}

// // Map to render
// // Filter
// // Reduce (highest vote?)
// // Sort

// function say(name) {
//   return "Hello " + name;
// }

// First class functions
// const say = function () {
//   console.log("Worked");
// };

// function test(callback) {
//   console.log("Starting my function....");
//   console.log("Doing some stuff....");
//   callback();
// }

// function makeDog() {
//   return function () {
//     return "Test worked";
//   };
// }

// const cat = {
//   breed: "persian",
//   age: 10,
//   meow: function () {
//     console.log("meooow");
//   },
// };
