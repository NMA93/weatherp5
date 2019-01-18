//Variablen
let sunrise;
let sunset;
let city;
let currtemp;
let cloud;
let time;
let input, button;
let key='a74aa3fca8cf4ace9e892158191101';

var img;
var img1; 
var img2;  

function preload() {
    img = loadImage('assets/background_clear.png');
    img1 = loadImage('assets/background_clouds.png');
    img2 = loadImage('assets/background_night.png');
  }

function setup() {
  createCanvas(414, 700);
  


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
    
    if (cloud<49){
      image(img, 0,0, width, height);
    }

    if (cloud>=49){
      image(img1, 0,0, width, height);
    }
    
    

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
  time=weather.location.localtime;
  currtemp=weather.current.temp_c;
  cloud=weather.current.cloud;
  sunrise=weather.forecast.forecastday[0].astro.sunrise;
  sunset=weather.forecast.forecastday[0].astro.sunset;

  console.log(time);

}


