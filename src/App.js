import {BrowserRouter as Router , Route, Routes} from "react-router-dom";
import './App.scss';
import Home from "./components/Home/Home";
import Movie from "./components/Movie/Movie";
import Nav from "./components/Navbar/Nav";
import Tv from "./components/TV/Tv";


function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/movies" element={<Movie/>}/>
            <Route path="/tvshows" element={<Tv/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
