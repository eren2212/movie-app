import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import MovieDetails from "./components/MovieDetails";
import Spinner from "./components/Spinner";

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
  const [search, setSearch] = useState("I am batman");
  const [errorMessage, setErrorMessage] = useState("");
  const [MovieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
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
    } catch (error) {
      console.log(error);
      setErrorMessage("Lütfen tekrar deneyiniz..");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

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
