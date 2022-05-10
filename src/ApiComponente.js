import axios from 'axios'
import { useEffect,useState  } from 'react';


const ApiComponente = () => {


const[weather,setWeather]=useState({})
const[isCelsius,setIsCelsius]=useState(false)
const [ isLoading, setIsLoading ] = useState(true);

useEffect(()=>{
function success(pos) {
                var crd = pos.coords;
            
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=6b47f1852b39235a024ae0c85ce12472`)
                .then(res=>{setWeather(res.data)
                    setIsLoading(false)        
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
          {
                isLoading?
                (
                                
                <div class="loadingio-spinner-eclipse-3av56ck46fl">
                    <div class="ldio-8zcwjji7if5">
                    <div></div>
                    </div></div>

                 ):(
                        <div>
                            <h1>Weather App</h1>
                            <h3> City : {weather.name}, '{weather.sys?.country}'</h3>
                        <div className="icon-temp">
                            <img  src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                            <h4>{isCelsius ? `${Math.floor(weather.main?.temp -273.15)*9/5+32 } F°`:`${Math.floor((weather.main?.temp -273.15 ))} C°`} </h4>
                            <h6> Min :{isCelsius ?`${Math.floor(weather.main?.temp_min -273.15)*9/5+32 } F°`  :`${Math.floor((weather.main?.temp_min-273.15 ))} C°`} -
                               Max: {isCelsius ? `${Math.floor(weather.main?.temp_max -273.15)*9/5+32 } F°`:`${Math.floor((weather.main?.temp_max-273.15 ))} C°`} </h6>
                        </div>
                        <div className="date">

                            <p><strong>Weather : {weather.weather?.[0].description}</strong></p>
                            <p><strong>Humidity : {weather.main?.humidity} %</strong></p>
                            <p><strong>Wind : {weather.wind?.speed} km/h</strong></p>
                            <p><strong>Pressure : {weather.main?.pressure} </strong></p>
                        </div>
                        <button onClick={changeTemp}  > <strong>Change F°/C°</strong></button>

                        </div>
        
                    )
            }
            </div>

       );
};

export default ApiComponente;