import {useEffect, useState} from "react";
import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Mynavbar from "./Mynavbar";
import CountrieFlag from "./CountrieFlag";
import { Route, Routes, Link } from "react-router-dom";
import Countrie from "./Countrie";
import MyPagination from "./Pagination";

const API_URL = "https://restcountries.com/v3.1";
const App = () => {
    const [countries, setCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(25);
    const [active, setActive] = useState(1);

    const SearchCountrie = async(type, value) => {
        if (type === 'name') {
            const response = await fetch(`${API_URL}/name/${value}`);
            const data = await response.json();
            setCountries(data);
        }
        else if (type === 'region') {
            const response = await fetch(`${API_URL}/region/${value}`);
            const data = await response.json();
            setCountries(data);
        }
        else if (type === 'language') {
            const response = await fetch(`${API_URL}/lang/${value}`);
            const data = await response.json();
            setCountries(data);
        }
        else if (type === 'capital') {
            const response = await fetch(`${API_URL}/capital/${value}`);
            const data = await response.json();
            setCountries(data);
        }
        else {
            const response = await fetch(`${API_URL}/all`);
            const data = await response.json();
            setCountries(data);
        }
    }
    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
        setActive(pageNumber);
    }
    const Home = () => {
        
        return (
            <div className="background">
                <div className="container">
                    <div className="navbar">
                        <Mynavbar updateCountire={SearchCountrie}/>
                    </div>
                    {
                        countries.length > 0 
                        ? (
                            <div className="container">
                                {  
                                    currentCountries.map((countrie) => (
                                        <Link to= {'/'+countrie.cca3}>
                                            <CountrieFlag countrie = {countrie} />
                                        </Link>
                                    ))}
                                    <MyPagination paginate={paginate} countriesPerPage={countriesPerPage} totalCountries={countries.length} active={active} />
                                
                            </div>
                        ) : (
                            <div className="Empty">
                                <h1>No countrie found!</h1>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
    useEffect(() => {
        SearchCountrie(0,0);
    }, []);

    let currentCountries = [];

    if (countries.length > 0) {
        const indexOfLastCountrie = currentPage * countriesPerPage;
        const indexOfFirstCountrie = indexOfLastCountrie - countriesPerPage;
        currentCountries = countries.slice(indexOfFirstCountrie, indexOfLastCountrie);
    }

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/:cca3' element= {<Countrie />} />
            </Routes>
        </div> 
    );
}

export default App;