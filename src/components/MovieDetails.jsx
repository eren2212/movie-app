import React from "react";
import { GoStarFill } from "react-icons/go";

const MovieDetails = ({ movieDetay }) => {
  const { title, poster_path, release_date, vote_average, original_language } =
    movieDetay;
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt=""
      />
      <div className="mt-4">
        <div className="flex items-center mb-4">
          <GoStarFill className="text-yellow-300 mr-2" />
          <p className="text-white">{Math.round(vote_average * 10) / 10}</p>
          <p className="text-red-400 ml-auto">{original_language}</p>
        </div>
        <div className="flex h-11">
          <p className="text-white mr-1.5"> {title}</p>
        </div>
        <div className="block">
          <p className=" mt-1 text-blue-300">{release_date}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
