import { getWeatherInfo, getWeatherGifUrl } from "./weatherData.js";
import {
  showWeatherInfo,
  showTodayWeatherGif,
  changeBgImage,
} from "./DomStuff.js";
import {
  loadingComponent,
  removeLoadingComponent,
} from "./loadingWeatherInfo.js";

const weatherForm = document.querySelector("#weather-form");
const elements = weatherForm.elements;
const btn = document.querySelector("#weather-form button");
const location = elements["location"];
const toggleBtn = document.querySelector("#toggleUnit");

toggleBtn.addEventListener("click", toggleUnitGroup);
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
  checkAndQuery();
}

function checkAndQuery() {
  if (!isValidlocation()) {
    weatherForm.reportValidity();
    return;
  }
  const locationValue = location.value;
  const locationarr = locationValue.split(",");
  const unitGroup = toggleBtn.dataset.unitGroup;
  // 请求api前加载loading组件
  loadingComponent();
  getWeatherInfo(locationarr[0], locationarr[1], unitGroup)
    .then((weatherInfo) => {
      const todayConditions = weatherInfo.days[0].conditions;
      const todayIcon = weatherInfo.days[0].icon;
      showWeatherInfo(weatherInfo);
      changeBgImage(todayIcon);
      getWeatherGifUrl(todayConditions).then((gifurl) => {
        showTodayWeatherGif(gifurl);
      });
    })
    .finally(() => {
      removeLoadingComponent();
    });
}

function toggleUnitGroup() {
  if (toggleBtn.dataset.unitGroup === "us") {
    toggleBtn.dataset.unitGroup = "metric";
    toggleBtn.value = "摄氏度";
  } else {
    toggleBtn.dataset.unitGroup = "us";
    toggleBtn.value = "华氏度";
  }
  checkAndQuery();
}
