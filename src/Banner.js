import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "./requests";
import "./Banner.css";
const base_url = "https://image.tmdb.org/t/p/w500";
function Banner() {

  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("https://api.themoviedb.org/3/discover/tv?api_key=c94dade0654c82c548aea0dfe3e47b20&with_networks=213");
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${base_url}${movie.backdrop_path})`,
        backgroundPosition: "center",
      }}
    >
      <div className="banner_content">
        <h1>{movie?.title || movie?.name || movie?.orignal_name}</h1>
      
      <div className="banner-buttons">
        <button className="banner-button">Play</button>
        <button className="banner-button">My List</button>
      </div>
      <h1 className="discription">
        {movie?.overview}
        {truncate(movie?.overview, 150)}
      </h1>
      </div>
      <div className="banner_fadedBottom"></div>
    </header>
  );
}

export default Banner;
