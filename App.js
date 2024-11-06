import React from "./React";
import ReactDom from "./ReactDom";

// testing custom react and custom reactDOM
let card;
fetch('https://restcountries.com/v3.1/all')
.then(res => res.json())
.then(res => {
    
    card = res.map((country) => {                        
        return <div class='container'>
        <img src={country.flags.png} alt=""/>
        <div className='card-text'>
            <h3 className='card-title'>{country.name.common}</h3>
            <p><b>Population: </b>{country.population}</p>
            <p><b>Region: </b>{country.region}</p>
            <p><b>Capital: </b>{country.capital}</p>
        </div>
    </div>
    })
    
    ReactDom.render(card, document.querySelector('#root'))
}) 
