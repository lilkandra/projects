import React from "react";

const CountrieFlag = ({countrie}) => {
    return (
        <div className="Flag">
            <div>
                <img src = {countrie.flags.png} alt="countrie"/>
            </div>
            <div>
                <h2>{countrie.name.common}</h2>
                <p>{countrie.region}</p>
            </div>
        </div>
    );
}

export default CountrieFlag;