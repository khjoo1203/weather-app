import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './components/WeatherBox';
import WeatherButton from './components/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader"

//1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다
//2. 날씨 정보에는 도시, 섭씨 화씨 날씨 상태
//3. 5개의 버튼이 있다 (1개는 현재 위치, 4개는 다른 도시)
//4. 도시 버튼을 클릭할 때 마다 도시별 날씨가 나온다
//5. 현재 위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Hwaseong-si");
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");
  
  const cities = ['paris', 'london', 'tokyo', 'seoul'];
  const API_KEY = process.env.REACT_APP_API_KEY;

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      //console.log("현재위치", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&appid=6a7359b5cbfccffff659f39f38caff86&units=metric`;
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();

    setWeather(data);
    setLoading(false);
    } catch (e) {
      setAPIError(e.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6a7359b5cbfccffff659f39f38caff86&units=metric`;
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();

    setWeather(data);
    setLoading(false);
    } catch (e) {
      console.log(e);
      setAPIError(e.message);
      setLoading(false);
    }
  }

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  }
  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading? (
        <div className="container">
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      ) : !apiError? (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            handleCityChange={handleCityChange}
            selectedCity={city}
          />
        </div>
      ): (
        apiError
      )}     
    </div>
  );
}

export default App;
