import { getWeatherInfo } from "./weatherData.js";

const weatherForm = document.querySelector("#weather-form");
const elements = weatherForm.elements;
const btn = document.querySelector("#weather-form button");
const location = elements["location"];

location.addEventListener("input", isValidlocation);
location.addEventListener("focusout", isValidlocation);
btn.addEventListener("click", formSubmitHandler);

function isValidlocation() {
  if (location.validity.valueMissing) {
    location.setCustomValidity("位置是必填项！");
    return false;
  } else if (location.value.split(",").length !== 2) {
    location.setCustomValidity("经纬度格式错误！");
    return false;
  }
  location.setCustomValidity("");
  return true;
}
function formSubmitHandler(e) {
  e.preventDefault();
  if (!isValidlocation()) {
    weatherForm.reportValidity();
    return;
  }
  const locationValue = location.value;
  const locationarr = locationValue.split(",");
  getWeatherInfo(locationarr[0], locationarr[1]).then((weatherInfo) => {
    console.log(weatherInfo);
  });
}
