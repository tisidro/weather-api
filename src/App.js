import React, { useState } from 'react'

const api_key = process.env.REACT_APP_API_KEY
const base = process.env.REACT_APP_BASE

console.log(api_key)
console.log(base)

function App () {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === 'Enter') {
      //getting the weather/sending request to api endpoint --could also do forecast.
      fetch(`${base}weather?q=${query}&units=imperial&APPID=${api_key}`)
        .then(res => res.json()) //json response
        .then(result => {
          setWeather(result)
          setQuery('')
        })
    }
  }

  const dateBuilder = d => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]

    let day = days[d.getDay()] //returns a number between 0-6 -- gets us the day out of the days
    let date = d.getDate() //returns a number between 1-31
    let month = months[d.getMonth()] //returns a number between 0-11 wih gets us a month
    let year = d.getFullYear() //gets the entire year

    //return as template strings

    return `${day} ${month} ${date}, ${year}`
  }
  return (
    // checking for type of weather--if undefined style will be app
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 60 //  check if temp is above 60 degrees
            ? 'app warm' //if so use warm style
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
            value={query} //bind value to the query
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div>
            <div className='today-weather'>Today's Weather...</div>
            <div className='location-box'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              {/* need to round temp, use Math.round() */}
              <div className='temp'>{Math.round(weather.main.temp)}°F</div>
              {/* array contains more than one for larger city, just return first item */}
              <div className='weather'>{weather.weather[0].main}</div>
              <div className='wind'>
                Wind Speed: {Math.round(weather.wind.speed)} mph
              </div>
              <div className='feels-like'>
                Feels like: {Math.round(weather.main.feels_like)} °F
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  )
}

export default App
{
  /* tip: if you type .location it fills it all out for you! */
}
