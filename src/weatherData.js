import { requestWeatherApi, requestWeatherGif } from "./weatherApi.js";

class DailyWeather {
  constructor(
    conditions,
    datetime,
    description,
    humidity,
    icon,
    tempmax,
    tempmin,
    temp,
  ) {
    this.conditions = conditions;
    this.datetime = datetime;
    this.description = description;
    this.humidity = humidity;
    this.icon = icon;
    this.tempmax = tempmax;
    this.tempmin = tempmin;
    this.temp = temp;
  }
}

class WeatherInfo {
  constructor(address, days) {
    this.address = address;
    this.days = days;
  }
}

export async function getWeatherInfo(
  latitude = 31.3,
  longitude = 120.6,
  unitGroup = "metric",
) {
  let location = {
    latitude: latitude,
    longitude: longitude,
  };
  let weatherInfo;
  const resJson = await requestWeatherApi(location, unitGroup);
  const days = [];
  for (const dailyInfo of resJson.days) {
    const dailyWeather = new DailyWeather(
      dailyInfo.conditions,
      dailyInfo.datetime,
      dailyInfo.description,
      dailyInfo.humidity,
      dailyInfo.icon,
      dailyInfo.tempmax,
      dailyInfo.tempmin,
      dailyInfo.temp,
    );
    days.push(dailyWeather);
  }
  weatherInfo = new WeatherInfo(resJson.address, days);
  return weatherInfo;
}

export async function getWeatherGifUrl(conditions) {
  const weatherGifInfo = await requestWeatherGif(conditions);
  if (weatherGifInfo) {
    const gifUrl = weatherGifInfo.data.images.original.url;
    return gifUrl;
  } else {
    return "#";
  }
}
