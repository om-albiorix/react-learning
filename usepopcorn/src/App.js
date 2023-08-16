import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useKey } from "./useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "6ff52f93";

export default function App() {
  // const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useState([]);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWacthed = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((Movie) => Movie.imdbID !== id));
  };

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify());
  }, [watched]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        handleCloseMovie();
      }
    });
  }, []);

  useEffect(
    function () {
      const controller = new AbortController();
      async function Fetchmovies() {
        try {
          setIsLoding(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("something wrong to fetching movies");

          const data = await res.json();
          if (data.Response === "false") throw new Error("Movie not Found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          console.error(err.message);
          setError(err.message);
          if (err.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsLoding(false);
        }
      }

      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }

      Fetchmovies();
      handleCloseMovie();

      return () => {
        console.log("clean up");
        controller.abort();
      };
    },
    [query]
  );

  return (
    <div className="main-div">
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoding ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoding && <Loader />}
          {!isLoding && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <Summary watched={watched} />
          )}
        </Box>
      </Main>
    </div>
  );
}

const Loader = () => {
  return <p className="loader">Loading...</p>;
};
const ErrorMessage = ({ message }) => {
  return <p>{message}</p>;
};
const Navbar = ({ children }) => {
  return (
    <div>
      <nav className="nav-bar">
        <Logo />
        {children}
      </nav>
    </div>
  );
};
const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};
const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);
  console.log("inputEl", inputEl)


  useEffect(() => {
    const callback = (e) => {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        inputEl?.current.focus()
        setQuery('')
      }

    }

    document.addEventListener("keydown", callback)
    return () => document.addEventListener('keydown', callback);


  }, [setQuery])


  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}

    />
  );
};

const NumResults = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies?.length} </strong>results
    </p>
  );
};

const Main = ({ children }) => {
  return <main className="main">{children}</main>;
};
const WatchMovieList = ({ watched }) => {
  return (
    <div>
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovie movie={movie} />
        ))}
      </ul>
    </div>
  );
};
const WatchedMovie = ({ movie }) => {
  return (
    <div>
      <li key={movie.imdbID}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
        </div>
      </li>
    </div>
  );
};

const MovieDetails = ({ selectedId, onCloseMovie }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Directors: director,
    Genre: genre,
  } = movie;

  useKey()

  useEffect(
    function () {
      async function getMoviesDetail() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMoviesDetail();
    },
    [selectedId]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating maxLength={7} size={24} />
              <div className="search-tt">Add to list</div>
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
};

const MovieList = ({ movies, onSelectMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
};

const Movie = ({ movie, onSelectMovie }) => {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)} key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

const Summary = ({ watched }) => {
  const avgImdbRating = average(watched?.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched?.map((movie) => movie.userRating));
  const avgRuntime = average(watched?.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
      <WatchMovieList watched={watched} />
    </div>
  );
};
