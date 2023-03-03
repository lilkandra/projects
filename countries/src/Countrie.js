import {useState,useEffect} from "react";
import Button from 'react-bootstrap/Button';

const Countrie = () => {
    const languages = () => {
        let lang = '';
        let i = 0;
        for (var l in countrie[0].languages) {
            if (i > 0)
                lang += ', ';
            if (countrie[0].languages.hasOwnProperty(l))
                lang += countrie[0].languages[l];
            i++;
        }
        return lang;
    }
    const currencies = () => {
        let cur = '';
        let i = 0;
        for (var c in countrie[0].currencies) {
            if (i>0)
                cur += ', ';
            if (countrie[0].currencies.hasOwnProperty(c))
                cur += countrie[0].currencies[c].name;
            i ++;
        }
        return cur;
    }
    const path = window.location.pathname;
    const [countrie, setCountrie] = useState([]);
    const API_URL = "https://restcountries.com/v3.1";
    const searchCountrie = async() => {
        const response = await fetch(`${API_URL}/alpha${path}`);
        const data = await response.json();
        setCountrie(data);
    }
    useEffect(() => {
        searchCountrie();
    },[])
    return (
        countrie.length > 0  ? (
            <div className="countrieDef">
                <div className="row">
                    <div className="col-4">
                        <img className="countrieFlag" src = {countrie[0].flags.png} />
                    </div>
                    <div className="col-6">
                        <div className="countrieName">
                            <h2>{countrie[0].name.common}</h2>
                            <h2>{countrie[0].name.official}</h2>
                        </div>
                    </div>
                    <div className="col-2">
                        <Button href="/" className="return">RETURN</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-9">
                        <div className="countrieInfos">
                            <h3>Capital: {countrie[0].capital}</h3>
                            <h3>Region: {countrie[0].region}</h3>
                            <h3>Subregion: {countrie[0].subregion}</h3>
                            <h3>Languages: {languages()}</h3>
                            <h3>Currencies: {currencies()}</h3>
                            <h3>Independent: {(countrie[0].independent)?'Yes':'No'}</h3>
                            <div className="col"></div>
                        </div>
                    </div>
                    <div className="col-3">
                        <img className="coatOfArms" src = {countrie[0].coatOfArms.png}></img>
                    </div>
                </div>
            </div>
        ) : (
            <div className="error">
                <h1>404 NOT FOUND!</h1>
            </div>
        )
    );
}

export default Countrie;