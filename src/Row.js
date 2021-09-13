import React, { useEffect, useState } from "react";
import Youtube from "react-youtube"
import "./Row.css";
import axios from "./axios";
import movieTrailer from "movie-trailer"
const base_url = "https://image.tmdb.org/t/p/w500";
function Row({ title, fetchUrl, isLargeRow }) {
  console.log(fetchUrl,"myurl")
  const [movies, setMovies] = useState([]);
  const [trailerUrl , setTrailerUrl]=useState("")
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  //   console.log(movies.poster_path);
  console.log(movies);
  const opts = {
    height: "390",
    width: "100%",
      playerVars: {
      autoplay:1
    }
  }
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('')
    }
    else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get("v"))
        })
      .catch((error) => console.log(error))
    }
  }
  return (
    <div className="Row">
      <h2>{title}</h2>
      <div className="posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`images ${isLargeRow && "largeImage"} `}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
