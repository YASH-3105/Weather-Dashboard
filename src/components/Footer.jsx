import React, { useContext } from 'react'
import "../assets/footer.css";
import { WeatherDataContext } from '../context/weatherDataContext';

const Footer = () => {
  const{state} = useContext(WeatherDataContext);
  return (
    <div className={state.dark?'footer-dark':'footer'}>
        <p> ❤️ <b> from Yashraj</b></p>
    </div>
  )
}

export default Footer