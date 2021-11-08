import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const requestUrl = 'https://restcountries.com/v3.1/all'
  const [search, setSearch] = useState('')
  const [matches, setMatches] = useState([])
  const [countries, setCountries] = useState([])

  const handleSearchChange = (event) => {

    const newMatches = countries.filter(({ name }) => {
      return name.common.toLowerCase().includes(event.target.value.toLowerCase())
    })
    console.log("matches: ", newMatches)
    setSearch(event.target.value)
    setMatches(newMatches)
  }

  useEffect(() => {
    axios.get(requestUrl)
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const filterLogic = () => {
    if (matches.length > 10) {
      return <p>Too many matches, keep typing!!</p>
    } else if (matches.length > 1) {
      return matches.map((match) => {
        return <p>{match.name.common}</p>
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
    </div>
  )
}



export default App;

