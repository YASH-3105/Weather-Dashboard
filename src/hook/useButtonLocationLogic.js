import { useContext, useEffect } from 'react';
import { useWeatherData } from './useWeatherData';
import { WeatherDataContext } from '../context/weatherDataContext';

const useButtonLocationLogic = () => {
  const { state, dispatch } = useContext(WeatherDataContext);
  
  // Only pass the parameters part
  const apiParams = `/weather?lat=${state.latitude}&lon=${state.longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
  
  const { fetchWeatherData } = useWeatherData(apiParams);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch({ type: 'SET_LAT', payload: latitude });
          dispatch({ type: 'SET_LON', payload: longitude });
        },
        (error) => {
          dispatch({ type: 'SET_ERROR', payload: error.message });
        }
      );
    } else {
      dispatch({ type: 'SET_ERROR', payload: "Geo Location Failed" });
    }
  }, [dispatch]);

  const handleFetchWeather = () => {
    console.log("Fetching weather by location:", state.latitude, state.longitude);
    fetchWeatherData();
  };

  return { handleFetchWeather };
};

export default useButtonLocationLogic;