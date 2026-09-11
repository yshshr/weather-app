import { format, isEqual, parse } from "date-fns";
import { zhCN } from "date-fns/locale";
import loadingGif from "../components/my-component/images/loading.gif";

export function showWeatherInfo(weatherInfo) {
  const weatherTable = document.querySelector("#weather-data");
  const headtr = weatherTable.firstElementChild;
  weatherTable.innerHTML = "";
  weatherTable.appendChild(headtr);
  for (const dailyWeather of weatherInfo.days) {
    const tr = createTableRow(dailyWeather);
    weatherTable.appendChild(tr);
  }
}

const weatherFields = [
  "icon",
  "conditions",
  "tempmin",
  "tempmax",
  "humidity",
  "description",
];

function createTableRow(dailyData) {
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  const datetime = dailyData.datetime;
  const weatherDate = parse(datetime, "yyyy-MM-dd", new Date());
  if (isEqual(datetime, format(new Date(), "yyyy-MM-dd"))) {
    th.textContent = "今天";
  } else {
    th.textContent = format(weatherDate, "yyyy-MM-dd eeee", { locale: zhCN });
  }

  tr.appendChild(th);
  for (const field of weatherFields) {
    const td = document.createElement("td");
    if (field === "icon") {
      const img = document.createElement("img");
      import(
        `../components/my-component/icons/weather-${dailyData[field]}.svg`
      ).then((icon) => {
        const { default: iconUrl } = icon;
        img.src = iconUrl;
        img.alt = "天气图标";
        img.height = "24";
        img.width = "24";
      });
      td.appendChild(img);
    } else {
      td.textContent = dailyData[field];
    }

    tr.appendChild(td);
  }
  return tr;
}

export function showTodayWeatherGif(gifurl) {
  const todayConditon = document.querySelector("#today-conditon");
  const img = document.createElement("img");
  img.src = gifurl;
  img.alt = "天气动图";
  img.width = "280";
  img.height = "280";
  todayConditon.innerHTML = "";
  todayConditon.appendChild(img);
}

export function changeBgImage(weatherIcon) {
  let bgImage;
  switch (weatherIcon) {
    case "rain":
      bgImage = "rainy.jpg";
      break;
    case "partly-cloudy-day":
      bgImage = "cloudy.jpg";
      break;
    case "clear-day":
      bgImage = "sunny.jpg";
      break;
    default:
      bgImage = "sunny.jpg";
      break;
  }

  import(`../components/my-component/images/${bgImage}`).then((image) => {
    const { default: imageUrl } = image;
    const body = document.querySelector("body");
    body.style.backgroundImage = `url(${imageUrl})`;
  });
}

export function appendLoadingComponent(selector) {
  const container = document.querySelector(selector);
  const img = document.createElement("img");
  img.src = loadingGif;
  img.alt = "加载中...";
  img.width = "150";
  img.height = "150";
  img.className = "loading-img";
  container.appendChild(img);
}

export function removeLoading(selector) {
  const container = document.querySelector(selector);
  const loadingImg = document.querySelector(".loading-img");
  container.removeChild(loadingImg);
}
