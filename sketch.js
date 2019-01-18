//Variablen
let sunrise;
let sunset;
let city;
let currtemp;
let input, button;
let key='a74aa3fca8cf4ace9e892158191101';

var img; 

function setup() {
  createCanvas(414, 700);
  img = createImg('https://github.com/NMA93/weatherp5/blob/master/assets/background_clear.png');


    let url = 'https://api.apixu.com/v1/forecast.json?key='+key+'&q=Zürich&days=1';
    //https://api.apixu.com/v1/forecast.json?key=a74aa3fca8cf4ace9e892158191101&q=Zürich&days=1//

    input = createInput();
    input.position(15,620);

    button=createButton('OK');
    button.position(input.x + input.width+10, 620);
    button.mousePressed(reloadJson);

    loadJSON(url, gotWeather);
}

function draw() {
    image(img, 0,0);
    background(86, 150, 169);

  text("Ort: "+city, 100,70);
  text("Aktuelle Temperatur: "+currtemp, 100,100);
  text("Sonnenaufgang ist um "+sunrise, 100,130);
  text("Sonnenuntergang ist um "+sunset, 100, 160);

}

function reloadJson(){
    let ort = input.value();
    let url = 'https://api.apixu.com/v1/forecast.json?key='+key+'&q='+ort+'&days=1';

    loadJSON(url, gotWeather);
}

function gotWeather(weather) {
  city=weather.location.name;
  currtemp=weather.current.temp_c;
  sunrise=weather.forecast.forecastday[0].astro.sunrise;
  sunset=weather.forecast.forecastday[0].astro.sunset;

  console.log(sunrise);

}


