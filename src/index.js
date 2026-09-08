import "../components/my-component/style.css";

import { getWeatherInfo } from "./weatherData.js";

getWeatherInfo().then((weatherInfo) => console.log(weatherInfo));
