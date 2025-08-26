import React from "react";

const TrendMovie = ({ movies, index }) => {
  return (
    <div className="flex flex-row justify-center relative">
      <h1 className="text-gray-100 ">{index + 1}</h1>
      <div className="h-40 w-30 flex flex-col justify-center items-center">
        <img
          src={
            movies.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movies.poster_path}`
              : `https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500`
          }
        />
        <h3 className="text-white mt-1">{movies.title}</h3>
      </div>
    </div>
  );
};

export default TrendMovie;
