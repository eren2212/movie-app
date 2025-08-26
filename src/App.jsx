import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import MovieDetails from "./components/MovieDetails";
import Spinner from "./components/Spinner";
import { useDebounce } from "react-use";
import { updateSearchCount, trendingMovie } from "./appwrite";
import TrendMovie from "./components/TrendMovie";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMBD_API_KEY;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [MovieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debounceSearchTerm, setdebounceSearchTerm] = useState("");
  const [trendMovie, settrendMovie] = useState([]);

  useDebounce(() => setdebounceSearchTerm(search), 500, [search]);
  const fetchMovies = async (query = " ") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error("failed fetch movies");
      }

      const data = await response.json();
      console.log(data.results);

      if (data.Resopnse === "False") {
        setErrorMessage(data.error || "failed to fetch movies");
        setMovieList([]);
      }
      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Lütfen tekrar deneyiniz..");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrendMovies = async () => {
    const movies = await trendingMovie();
    settrendMovie(movies || []);
  };

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
    fetchTrendMovies();
  }, [debounceSearchTerm]);

  return (
    <div className="pattern">
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero" />
          <h1>
            Zahmetsizce Keyif Alacağınız{" "}
            <span className="text-gradient">Filmleri</span> Bulun
          </h1>
          <Search searchTerm={search} setSearchTerm={setSearch} />
        </header>

        <section className="flex flex-col gap-10 justify-center items-center mt-10 sm:flex-row ">
          {trendMovie.map((movie, index) => {
            return <TrendMovie movies={movie} key={movie.$id} index={index} />;
          })}
        </section>
        <section className="all-movies mt-10">
          <h2 className="text-left">Bütüm Filmler</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-900">{errorMessage}</p>
          ) : (
            <ul>
              {MovieList.map((movie) => {
                return <MovieDetails key={movie.id} movieDetay={movie} />;
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
