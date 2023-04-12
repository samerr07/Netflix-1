import React, { useEffect, useState } from 'react'
import "./home.scss";
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



const Home = () => {

    const [popularMovies,setPopularMovies] = useState([])
    const [popularTv, setPopularTv] = useState([])
    const [trending, setTrending] = useState([])

    useEffect(()=>{
        const fetchPopularMovie = async ()=>{
            const {data:{results}} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
            setPopularMovies(results)
            // console.log(results)
        }

        const fetchPopularTv = async ()=>{
            //api.themoviedb.org/3/tv/popular?api_key=<<api_key>>&language=en-US&page=1
            const {data:{results}} = await axios.get(`${url}/tv/${popular}?api_key=${apiKey}`)
            setPopularTv(results)
            // console.log(results)
        }

        const fetchTrending= async ()=>{
            //api.themoviedb.org/3/trending/all/day?api_key=2451e9204910751ae9969c445146ecd2
            const {data:{results}} = await axios.get(`${url}/trending/all/day?api_key=${apiKey}`)
            setTrending(results)
            // console.log(results)
        }

        fetchPopularMovie();
        fetchPopularTv();
        fetchTrending();
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

        <Row title={"Popular Movies"} arr={popularMovies}/>     
        <Row title={"Popular Tv Shows"} arr={popularTv}/> 
        <Row title={"Trending"} arr={trending}/> 

        
            

        

    </section>
  )
}

export default Home
