import axios from 'axios'
import { useEffect,useState  } from 'react';


const ApiComponente = () => {


const[weather,setWeather]=useState({})
const[isCelsius,setIsCelsius]=useState(false)

useEffect(()=>{

function success(pos) {
    var crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=6b47f1852b39235a024ae0c85ce12472`)
       .then(res=>{setWeather(res.data)
                  
    })
            
       
  }
  
  function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error);
},[])
console.log(weather)
const changeTemp = ()=>setIsCelsius(!isCelsius)


    return (
        <div className="App">

            <h1>Weather App</h1>
            <h3> City : {weather.name}, '{weather.sys?.country}'</h3>
        <div className="icon-temp">
            <img  src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
            <h4>{isCelsius ? `${Math.round(weather.main?.temp) } F°`:`${Math.round((weather.main?.temp -32 *5)/9)} C°`} </h4>
            

        </div>
        <div className="date">

            <p><strong>Weather : {weather.weather?.[0].description}</strong></p>
            <p><strong>Humidity : {weather.main?.humidity} %</strong></p>
            <p><strong>Wind : {weather.wind?.speed} km/h</strong></p>
        </div>
           <button onClick={changeTemp}  > <strong>Change F°/C°</strong></button>

        </div>
    );
};

export default ApiComponente;