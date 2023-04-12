import React, { useEffect, useState } from 'react'
import "./tv.scss";
import axios from 'axios';
import {AiOutlinePlus} from "react-icons/ai"
import {BiPlay} from "react-icons/bi"
import {MdFavorite} from "react-icons/md"



const apiKey = "2451e9204910751ae9969c445146ecd2"
const url = "https://api.themoviedb.org/3"

const imgUrl = "https://image.tmdb.org/t/p/original"
const popular = "popular"




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



const Tv = () => {

  const [popularMovies, setPopularMovies] = useState([])
  const [onair, setOnAir] = useState([])
  const [onairToday, setOnAirToday] = useState([])
  const [toprated, setToprated] = useState([]);

  useEffect(()=>{
    const fetchPopular = async ()=>{
      const {data:{results}} = await axios.get(`${url}/tv/${popular}?api_key=${apiKey}`)
      setPopularMovies(results)
    }

    const fetchOnAir = async ()=>{
      const {data:{results}} = await axios.get("https://api.themoviedb.org/3/tv/on_the_air?api_key=2451e9204910751ae9969c445146ecd2")
      setOnAir(results)
      // console.log(results)
    }

    const fetchOnAirToday = async ()=>{
      const {data:{results}} = await axios.get("https://api.themoviedb.org/3/tv/airing_today?api_key=2451e9204910751ae9969c445146ecd2")
      setOnAirToday(results)
      console.log(results)
    }

    const fetchTopRated = async ()=>{
      const {data:{results}} = await axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=2451e9204910751ae9969c445146ecd2")
      setToprated(results)
      console.log(results)
    }


    fetchPopular();
    fetchOnAir();
    fetchOnAirToday();
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

        <Row title={"TV On The Air"} arr={onair}/>
        <Row title={"Top Rated"} arr={toprated}/> 
        <Row title={"Popular Shows"} arr={popularMovies}/>     
        <Row title={"On Air Today"} arr={onairToday}/> 
  
            

        

    </section>
  )
}

export default Tv

