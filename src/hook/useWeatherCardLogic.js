import { useContext, useEffect, useState } from "react";
import { WeatherDataContext } from "../context/weatherDataContext";
import { weatherimage } from "../util/images";
import { useWeatherData } from "./useWeatherData";

export const useWeatherCardLogic = (data) => {
  const { state } = useContext(WeatherDataContext);
  const [farenheit, setFarenheit] = useState(false);
  const [background, setBackground] = useState(weatherimage.defaultImg);
  
  // The API_URL should be reconstructed here - not read directly from env
  const API_URL = `${process.env.REACT_APP_API_LINK}/weather?q=${state.city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
  
  // Use the existing useWeatherData hook
  const { fetchWeatherData } = useWeatherData(API_URL);

  useEffect(() => {
    if (data?.weather) {
      updateBackground();
    }
  }, [data]);

  const updateBackground = () => {
    if (!data?.weather) return;
    
    const weatherCondition = data.weather[0].main;

    // Define background images for different weather conditions
    const backgrounds = {
      Clear: weatherimage.clearImg,
      Rain: weatherimage.rainImg,
      Snow: weatherimage.snowImg,
      Clouds: weatherimage.cloudImg,
      Fog: weatherimage.fogImg,
      Smoke: weatherimage.smokeImg,
      Haze: weatherimage.smokeImg,
      Mist: weatherimage.fogImg,
      Thunderstorm: "thunderstorm.jpg",
      // Add more as needed
    };

    // Set the background based on the weather condition
    setBackground(backgrounds[weatherCondition] || weatherimage.defaultImg);
  };

  const refresh = () => {
    fetchWeatherData();
  };
  
  const convertTemp = () => {
    setFarenheit(!farenheit);
  };

  return {
    refresh,
    convertTemp,
    farenheit,
    state,
    background
  };
};