import { useContext } from 'react'
import { useWeatherData } from './useWeatherData';
import { WeatherDataContext } from '../context/weatherDataContext';

const useSearchBarLogic = () => {
    const { state, dispatch } = useContext(WeatherDataContext);
    
    // Only pass the parameters part, not the full URL
    const apiParams = `/weather?q=${state.city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    
    const { fetchWeatherData } = useWeatherData(apiParams);
    
    const handleChange = (value) => {
      if(value.length >= 0){
        dispatch({ type: 'SET_CITY', payload: value });
      }
    };
    
    const fetchDetails = (event) => {
      event?.preventDefault();
      
      // Check if API key is available for debugging
      console.log("Searching for city:", state.city);
      console.log("API Key available:", !!process.env.REACT_APP_API_KEY);
      
      fetchWeatherData();
    };
    
    return { handleChange, fetchDetails };
}

export default useSearchBarLogic;