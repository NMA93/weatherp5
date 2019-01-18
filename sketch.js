//Variablen definieren
//Mit Werten gefüllt werden diese in der Funktion gotWeather
let sunrise;
let sunset;
let city;
let currtemp;
let key='a74aa3fca8cf4ace9e892158191101';

function setup() {
  createCanvas(414, 700);


    let url = 'https://api.apixu.com/v1/forecast.json?key='+key+'&q=Zürich&days=1';
    //https://api.apixu.com/v1/forecast.json?key=a74aa3fca8cf4ace9e892158191101&q=Zürich&days=1//

  //Dokumentation
    // https://www.apixu.com/doc/forecast.aspx
  loadJSON(url, gotWeather);

}

function draw() {
  background(86, 150, 169);
  text("Ort: "+city, 100,70);
  text("Aktuelle Temperatur: "+currtemp, 100,100);
  text("Sonnenaufgang ist um "+sunrise, 100,130);
  text("Sonnenuntergang ist um "+sunset, 100, 160);

}

function gotWeather(weather) {
  city=weather.location.name;
  currtemp=weather.current.temp_c;
  sunrise=weather.forecast.forecastday[0].astro.sunrise;
  sunset=weather.forecast.forecastday[0].astro.sunset;

  console.log(sunrise);

}


