import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [city, setCity] = useState('')
  let [wDetails, setWdetails] = useState()
  let [isLoader, setIsloader] = useState(false)
  let getData = (event) => {
    setIsloader(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=997ca57696beb268cfa5666693c439ce&units=metric`)
      .then((res) => res.json())
      .then((finalRes) => {
        if(finalRes.cod == '404'){
          setWdetails(undefined)
        }
        else{
          console.log(finalRes)
          setWdetails(finalRes)
        }
        setIsloader(false)
      })

      
    event.preventDefault()
    setCity('')
  }

  return (
    <div className="box">
      <div className="whether-data">
        <h1>Simple Whether App</h1>

        <form onSubmit={getData}>
          <input type='text' value={city} onChange={(e) => setCity(e.target.value)}></input>
          <button> Submit</button>
        </form>
        <div className='whether-info'>
          <img src='https://i.gifer.com/ZKZg.gif' width={100} className={isLoader ? 'loader-show' : 'loader'}/>
          {wDetails !== undefined
            ?
            <>
              <h3>{wDetails.name} <span>{wDetails.sys.country}</span></h3>
              <h2>{wDetails.main.temp} oc</h2>
              <img src={`https://openweathermap.org/img/wn/${wDetails.weather[0].icon}.png`}></img>
              <p>{wDetails.weather[0].description}</p>
            </>
            : "No Data"
      }
        </div>
      </div>
    </div>
  );
}

export default App;