import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const countryUrl = 'https://restcountries.com/v3.1/all'
  const [search, setSearch] = useState('')
  const [matches, setMatches] = useState([])
  const [countries, setCountries] = useState([])

  const handleSearchChange = (event) => {

    const newMatches = countries.filter(({ name }) => {
      return name.common.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setSearch(event.target.value)
    setMatches(newMatches)
  }

  useEffect(() => {
    axios.get(countryUrl)
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const showCountry = (country) => () => {
    setSearch(country.name.common)
    setMatches([country])
  }

  const filterLogic = () => {
    if (matches.length > 10) {
      return <p>Too many matches, keep typing!!</p>
    } else if (matches.length > 1) {
      return matches.map((match) => {
        return <p>{match.name.common} <button onClick={showCountry(match)}>show</button></p>
      })
    } else if (matches.length === 1) {
      return <CountryStats country={matches[0]} />
    } else {
      return <p>No matches...</p>
    }
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange} />
      {filterLogic()}
    </div >
  );
}

const CountryStats = ({ country }) => {
  const weatherUrl = 'http://api.weatherstack.com/'
  const api_key = process.env.REACT_APP_API_KEY
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    axios.get(`${weatherUrl}/current?access_key=${api_key}&query=${country.capital[0]}`)
      .then((response) => {
        setWeatherData(response.data)
        console.log("RESPONSE DATA: ", response.data)
      })
  }, [])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital[0]}</p>
      <p>population: {country.population}</p>

      <h2>Languages</h2>
      <ul>
        {
          Object.keys(country.languages).map((key) => {
            return <li key={key}>{country.languages[key]}</li>
          })
        }
      </ul>
      <img src={country.flags.png} alt="country flag" />

      {
        weatherData ? <WeatherStats weatherData={weatherData} capital={country.capital[0]} /> : <></>
      }
    </div>
  )
}

const WeatherStats = ({ weatherData, capital }) => {
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p><b>temperature:</b> {weatherData.current.temperature} Celcius</p>
      <img src={weatherData.current.weather_icons[0]} alt="weather icon" />
      <p><b>wind:</b> {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</p>
    </div>
  )
}


export default App;

