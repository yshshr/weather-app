export async function requestWeatherApi(locationInfo, unitGroup) {
  let location;
  if (locationInfo.latitude && locationInfo.longitude) {
    location = locationInfo.latitude + "," + locationInfo.longitude;
  } else if (location.city) {
    location = location.city;
  }
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&include=days&key=UBSC6YRVQFY7H598UF2CXCNJV&contentType=json&lang=zh`,
    );
    if (!response.ok) {
      throw new Error("weather api return error!");
    }
    const resJoon = await response.json();
    return resJoon;
  } catch (error) {
    console.error(error);
  }
}
