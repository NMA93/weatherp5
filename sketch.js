//Variablen
let sunrise;
let sunset;
let city;
let currtemp;
let cloud;
let time;
let input, button;
let key='a74aa3fca8cf4ace9e892158191101';
let weatherdays=[];
let rain=[];
let wind=[];

var img;
var img1; 
var img2;  

function preload() {
    img = loadImage('assets/background_clear.png');
    img1 = loadImage('assets/background_light_clouds.png');
    img2 = loadImage('assets/background_clouds.png');
  }

function setup() {
  createCanvas(414, 700);
  
  
    let url = 'https://api.apixu.com/v1/forecast.json?key='+key+'&q=Zürich&days=4';
    // https://api.apixu.com/v1/forecast.json?key=a74aa3fca8cf4ace9e892158191101&q=Zürich&days=1//

    input = createInput();
    input.position(15,620);

    button=createButton('OK');
    button.position(input.x + input.width+10, 620);
    button.mousePressed(reloadJson);

    loadJSON(url, gotWeather);
}


function draw() {
    
    if (cloud<=30){
      image(img, 0,0, width, height);
    }

    if (cloud<=49){
      image(img1, 0,0, width, height);
    }

    if (cloud>=49){
      image(img2, 0,0, width, height);
    }
    
    drawPosition0();

    if(wind.length>0){
      drawWind0();
      drawWind1();
      drawWind2();
      drawWind3();
    }

    if(rain.length>0){
      drawRain0();
      drawRain1();
      drawRain2();
      drawRain3();
    }

    if(weatherdays.length>0){
      drawPosition1();
      drawPosition2();
      drawPosition3();
    }      
}



//Positions

function drawPosition0(){

  textSize(30);
  text("Ort: "+city,120, 70);
  textSize(16);
  text("Datum: "+time, 120, 100);
  text("Aktuelle Temperatur: "+currtemp, 120,130);

}

function drawPosition1(){
  textSize(16);
  fill(0)
  text("Datum: "+weatherdays[1].date, 120, 210);
  text("Max. Temperatur: "+weatherdays[1].day.maxtemp_c, 120,230);
  text("Max. Temperatur: "+weatherdays[1].day.mintemp_c, 120,250);
}

function drawPosition2(){
  fill(0)
  textSize(16);
  text("Datum: "+weatherdays[2].date, 120, 320);
  text("Max. Temperatur: "+weatherdays[2].day.maxtemp_c, 120, 340);
  text("Max. Temperatur: "+weatherdays[2].day.mintemp_c, 120, 360); 
}

function drawPosition3(){
  fill(0)
  textSize(16);
  text("Datum: "+weatherdays[3].date, 120, 430);
  text("Max. Temperatur: "+weatherdays[3].day.maxtemp_c, 120, 450);
  text("Max. Temperatur: "+weatherdays[3].day.mintemp_c, 120, 470);   
}


//Rain

function drawRain0(){
  fill(0,0,255,100);
  noStroke();
  ellipse(50,70, rain[0].day.totalprecip_mm*10, rain[0].day.totalprecip_mm*10);
}

function drawRain1(){
  fill(0,0,255,100);
  noStroke();
  ellipse(50,210, rain[1].day.totalprecip_mm*10, rain[1].day.totalprecip_mm*10);
}

function drawRain2(){
  fill(0,0,255,100);
  noStroke();
  ellipse(50,320, rain[2].day.totalprecip_mm*10, rain[2].day.totalprecip_mm*10);
}

function drawRain3(){
  fill(0,0,255,100);
  noStroke();
  ellipse(50,430, rain[3].day.totalprecip_mm*10, rain[3].day.totalprecip_mm*10);
}

//Wind

function drawWind0(){
  fill(255,255,255,100);
  noStroke();
  ellipse(50,100, wind[0].day.maxwind_kph*5, wind[0].day.maxwind_kph*5);
}

function drawWind1(){
  fill(255,255,255,100);
  noStroke();
  ellipse(50,240, wind[1].day.maxwind_kph*5, wind[1].day.maxwind_kph*5);
}

function drawWind2(){
  fill(255,255,255,100);
  noStroke();
  ellipse(50,350, wind[2].day.maxwind_kph*5, wind[2].day.maxwind_kph*5);
}

function drawWind3(){
  fill(255,255,255,100);
  noStroke();
  ellipse(50,450, wind[3].day.maxwind_kph*5, wind[3].day.maxwind_kph*5);
}



//Reload

function reloadJson(){
    let ort = input.value();
    let url = 'https://api.apixu.com/v1/forecast.json?key='+key+'&q='+ort+'&days=4';

    loadJSON(url, gotWeather);
}


function gotWeather(weather) {

  city=weather.location.name;
  time=weather.location.localtime;
  currtemp=weather.current.temp_c;
  cloud=weather.current.cloud;
  sunrise=weather.forecast.forecastday[0].astro.sunrise;
  sunset=weather.forecast.forecastday[0].astro.sunset;
  weatherdays=weather.forecast.forecastday;
  rain=weather.forecast.forecastday;
  wind=weather.forecast.forecastday;
  
  console.log(weather.current.cloud);

}


