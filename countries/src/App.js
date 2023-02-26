import {useEffect, useState, useContext} from "react";
import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Mynavbar from "./Mynavbar";
import CountrieFlag from "./CountrieFlag";

const API_URL = "https://restcountries.com/v3.1";
const App = () => {
    const [countries, setCountries] = useState([]);
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
    useEffect(() => {
        SearchCountrie(0,0);
    }, []);
    return (
        <div className="app">
            <div className="navbar">
                <Mynavbar updateCountire={SearchCountrie}/>
            </div>
            {
                countries.length > 0 
                ? (
                    <div className="container">
                        {  
                            countries.map((countrie) => (
                                <CountrieFlag countrie = {countrie} />
                            ))}
                    </div>
                ) : (
                    <div className="Empty">
                        <h1>No countrie found!</h1>
                    </div>
                )
            }
        </div> 
    );
}

export default App;