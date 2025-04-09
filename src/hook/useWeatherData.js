import { useContext } from "react";
import { WeatherDataContext } from "../context/weatherDataContext";

/**
 * Custom hook to fetch weather data from the API.
 * @param {string} apiParams - The API parameters for fetching weather data.
 * @returns {Object} - An object containing the fetchWeatherData function.
 */

export function useWeatherData(apiParams) {
  // Accessing weather data context
  const { dispatch, state } = useContext(WeatherDataContext);

  /**
   * Function to fetch weather data from the API.
   */
  const fetchWeatherData = async () => {
    // Ensure we have the API key and base URL
    const API_KEY = process.env.REACT_APP_API_KEY;
    const API_BASE = process.env.REACT_APP_API_LINK;
    
    // Log for debugging
    console.log("API Key available:", !!API_KEY);
    console.log("API Base available:", !!API_BASE);
    
    // Handle missing env variables
    if (!API_KEY || !API_BASE) {
      console.error("Missing API environment variables!");
      dispatch({ 
        type: 'SET_ERROR', 
        payload: "API configuration error. Please check your environment variables." 
      });
      return;
    }
    
    // Construct the full URL
    const url = `${API_BASE}${apiParams}`;
    console.log("Fetching weather from:", url);
    
    if (url) {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        // Call the OpenWeatherMap API with the provided URL
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok or City name is invalid');
        }
        const result = await response.json();

        if(result){
          // Update the weather data state
          dispatch({ type: 'SET_WEATHER_DATA', payload: result });
          dispatch({ type: 'SET_ERROR', payload: "" });
        }
        else{
          throw new Error("Weather data not available");
        }
        
      } catch (error) {
        console.error('Error occurred while fetching weather data:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
      finally{
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      // Reset the weather data state
      dispatch({ type: 'SET_ERROR', payload: "Invalid API URL" });
    }
  };

  return { fetchWeatherData };
}