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
  )}
import { LC, NC, SC, UC } from './Data/char';

function App() {
  let [uppercase , setUppercase] = useState(false)
  let [lowercase, setLowercase] = useState(false)
  let [number, setNumber] = useState(false)
  let [symbol, setSymbol] = useState(false)
  let [passwordLen, setPasswordLen] = useState(10)
  let [fpass, setFpass] = useState()

  let genreatePass = () => {
    let charSet ='';
    let  finalPass = '';
    if(uppercase || lowercase || number || symbol){
      if(uppercase) charSet+=UC;
      if(lowercase) charSet+=LC;
      if(number) charSet+=NC;
      if(symbol) charSet+=SC;
      console.log(charSet);

      for(let i=0; i<passwordLen; i++){
        finalPass += charSet.charAt(Math.floor(Math.random() * charSet.length))
        
      }
      setFpass(finalPass)
    }
    
    else{
      alert("Please selete on checkbox..")
    }
  }

  let copyPass=()=>{
    navigator.clipboard.writeText(fpass) //for copy the text on the clipboard..
  }

  return (
    <>
    <div className="passwordBox">
      <h2>Password Generator</h2>

      <div className='passwordIn'>
      <input type='text' readOnly value={fpass}></input><button onClick={copyPass}>Copy</button>
      </div>

      <div className='passwordLen'>
        <label>Password length</label>
        <input type='number' min={10} max={20} value={passwordLen} onChange={(event)=>setPasswordLen(event.target.value)}></input>
      </div>

      <div className='checkBox'>
        <label>Include uppercase letter</label>
        <input type='checkbox' checked={uppercase} onChange={()=>setUppercase(!uppercase)}></input>
      </div>

      <div className='checkBox'>
        <label>Include lowercase letter</label>
        <input type='checkbox' checked={lowercase} onChange={()=>setLowercase(!lowercase)}></input>
      </div>

      <div className='checkBox'>
        <label>Include numbers</label>
        <input type='checkbox' checked={number} onChange={()=>setNumber(!number)}></input>
      </div>

      <div className='checkBox'>
        <label>Include special characters</label>
        <input type='checkbox' checked={symbol} onChange={()=>setSymbol(!symbol)}></input>
      </div>

      <div className='btn'>
      <button onClick={genreatePass}>Generate</button>
      </div>
    </div>
    </>

  );
}

export default App;
