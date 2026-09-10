export function showWeatherInfo(weatherInfo) {
  const weatherTable = document.querySelector("#weather-data");
  const headtr = weatherTable.firstChild;
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
  th.textContent = dailyData.datetime;
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
