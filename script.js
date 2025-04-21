const searchBtn = document.querySelector("#btn-blink");
const movieList = document.querySelector(".search__list");
const API_KEY = "f2631148";

async function movieSearch(event) {
  event.preventDefault();
  const searchInput = document.querySelector("input[name='search']");
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") return;

  movieList.innerHTML = "<p>Loading...</p>";

  const apiUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s=` + searchTerm;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.Response === "True") {
      const sixMovies = data.Search.slice(0, 6);
      movieList.innerHTML = "";

      for (const movie of sixMovies) {
        const detailRes = await fetch(
          `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
        );
        const details = await detailRes.json();

        const card = document.createElement("div");
        card.classList.add("search__cards", "show");
        card.innerHTML = `
          <div class="search__card">
            <div class="search__item--container">
              <img src="${details.Poster}" alt="${details.Title}" />
              <h3>Title: ${details.Title}</h3>
              <p><b>Year:</b> ${details.Year}</p>
              <p><b>Plot:</b> ${details.Plot}</p>
              <p><b>Rated:</b> ${details.Rated}</p>
            </div>
          </div>
        `;
        movieList.appendChild(card);
      }
    } else {
      movieList.innerHTML = "<p>No movies found. Try a different title.</p>";
    }
  } catch (err) {
    console.error("Error:", err);
    movieList.innerHTML = "<p>Something went wrong.</p>";
  }
}

searchBtn.addEventListener("click", movieSearch);

// calling this api movie request
function moveList() {
  return [
    { Title: "Guardians of the Galaxy Vol. 2" },
    { Year: "2017", Rated: "PG-13" },
    { Released: "05 May 2017" },
    { Runtime: "136 min" },
    { Genre: "Action,Adventure,Comedy" },
    { Director: "James Gunn,Dan Abnett, Andy Lanning" },
    { Actors: "Chris Pratt, Zoe Saldaña, Dave Bautista" },
    {
      Plot: "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
    },
    { Language: "English" },
    { Country: "USA" },
    { Awards: "Nominated for 1 Oscar. 15 wins & 61 nominations total" },
    {
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      Ratings: [
        { Source: "Internet Movie Database", Value: "7.6/10" },
        { Source: "Rotten Tomatoes", Value: "85%" },
        { Source: "Metacritic", Value: "67/100" },
      ],
    },
    { Metascore: "67" },
    { imdbRating: "7.6" },
    { imdbVotes: "788,570" },
    { imdbID: "tt3896198" },
    { Type: "movie", DVD: "N/A" },
    { BoxOffice: "$389,813,101" },
    { Production: "Marvel Studios", Website: "N/A", Response: "True" },
    { Website: "N/A" },
    { Response: "True" },
  ];
}
