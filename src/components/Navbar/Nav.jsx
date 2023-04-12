import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../logo.png"
import {ImSearch} from "react-icons/im"
import "./nav.scss";
import axios from 'axios';

const Nav = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      // const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=2451e9204910751ae9969c445146ecd2&query=${searchTerm}`);
      // setMovies(response.data.results);
      // console.log(response.data.results)

      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=2451e9204910751ae9969c445146ecd2&query=${searchTerm}`);
      const moviesWithImages = response.data.results.map((movie) => ({
        ...movie,
        imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      }));
      setMovies(moviesWithImages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = (movie) => {
    setMovies(movies.filter((m) => m.id !== movie.id));
  };

 
  
  return (
  
<>
    <nav className='navbar'>
        <img src={logo} alt="" width={"132px"} height={"40px"} />

        <div>
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/tvshows">TV Shows</Link>
            <Link to="/kids">Kids</Link>
            <Link to="/mylist">My List</Link>
        </div>
        
        <div className="search">
            <input 
            type="text"
            value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your favourite movies"
             />
            <ImSearch onClick={handleSearch}  className='ser' />

        </div>  
    </nav>
    
    <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie">
            <img src={movie.imageUrl} alt={movie.title} />
            <div className="movie-details">
              <h2>{movie.title}</h2>
              {/* <p>{movie.overview}</p> */}
            </div>
            <button className="close" onClick={() => handleClose(movie)}>×</button>
          </div>
        ))}
      </div>
      </>
  )
}

export default Nav

