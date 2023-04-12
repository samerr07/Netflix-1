import React, { useEffect, useState } from 'react'
import "./movie.scss";
import axios from 'axios';
import {AiOutlinePlus} from "react-icons/ai"
import {BiPlay} from "react-icons/bi"
import {MdFavorite} from "react-icons/md"


const apiKey = "2451e9204910751ae9969c445146ecd2"
const url = "https://api.themoviedb.org/3"
const upcoming = "upcoming"
const imgUrl = "https://image.tmdb.org/t/p/original"
const popular = "popular"
const topRated = "top_rated"
const nowPlaying = "now_playing"

const Card = ({img})=> (
    <>
  <img className='card' src={img} alt="" />
  <div ><MdFavorite className='fav' size={"25px"} /></div>
  </>
)

const Row = ({title, arr=[]})=>(
  <div className='row'>
      <h2>{title}</h2>
      <div>
          {
              arr.map((item,index)=>(
                  <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
              ))
          }
      </div>
      
  </div>
)

const Movie = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    


    useEffect(()=>{
        const fetchUpcoming = async () => {
            // https://api.themoviedb.org/3/movie/upcoming?api_key=2451e9204910751ae9969c445146ecd2&language=en-US&page=1 
            const {data:{results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
            setUpcomingMovies(results);
        };

        const fetchPopular = async () => {
            // https://api.themoviedb.org/3/movie/now_playing?api_key=2451e9204910751ae9969c445146ecd2&language=en-US&page=1
            const {data:{results}} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
            setPopularMovies(results)
        }
        const fetchNowPlaying = async () => {
            // https://api.themoviedb.org/3/movie/now_playing?api_key=2451e9204910751ae9969c445146ecd2&language=en-US&page=1
            const {data:{results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
            setNowPlayingMovies(results)
        }
        const fetchTopRated = async () => {
            // https://api.themoviedb.org/3/movie/now_playing?api_key=2451e9204910751ae9969c445146ecd2&language=en-US&page=1
            const {data:{results}} = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
            setTopRatedMovies(results)
        }

      
        fetchUpcoming();
        fetchNowPlaying();
        fetchPopular();
        fetchTopRated();
        
    },[])


  return (
    <section className='home'>
        <div
                className="banner"
                style={{
                    backgroundImage: popularMovies[0]
                        ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
                        : "rgb(16, 16, 16)",
                }}
        >
            {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
            {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

            <div>
                <button><BiPlay/> Play</button>
                <button>My List <AiOutlinePlus/> </button>
            </div>
        </div>

        <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
        <Row title={"Now Playing"} arr={nowPlayingMovies}/> 
        <Row title={"Popular"} arr={popularMovies}/>     
        <Row title={"Top Rated"} arr={topRatedMovies}/> 

           
            

        

    </section>
  )
}

export default Movie
