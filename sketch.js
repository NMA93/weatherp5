//Variablen
let sunrise;
let sunset;
let city;
let currtemp;
let cloud;
let time;
let night;
let input, button;
let key='a74aa3fca8cf4ace9e892158191101';
let weatherdays=[];
let rain=[];
let wind=[];
let NORMAL;
let BOLD;

//Pictures
var img;
var img1; 
var img2;
var img3;

function preload() {
    img = loadImage('assets/background_clear.png');
    img1 = loadImage('assets/background_light_clouds.png');
    img2 = loadImage('assets/background_clouds.png');
    img3 = loadImage('assets/background_night.png');
    NORMAL = loadFont('assets/Sarabun-Regular.otf');
    BOLD = loadFont('assets/Sarabun-Bold.otf');
  }

function setup() {
  createCanvas(414, 700);

    textFont(NORMAL);
  
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

  //console.log(night);

  if (night==0){
    image(img3, 0,0, width, height);
  }
  
  else {
    if (cloud<40){
      image(img, 0,0, width, height);
    }

    if (cloud>=50){
      image(img1, 0,0, width, height);
    }

    if (cloud>=69){
      image(img2, 0,0, width, height);
    }
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

    drawLegend1();
    drawLegend2();
    
}



//Positions

function drawPosition0(){

  if (night==0){
    fill(255);
  }
  else {
    fill(0);
    }
  
  textFont(BOLD);
  textSize(30);
  text(""+city,150, 70);
  textFont(BOLD);
  textSize(16);
  text("Datum: "+time, 150, 100);
  textFont(NORMAL);
  text("Aktuelle Temperatur: "+currtemp, 150,130);
}

function drawPosition1(){
  textSize(16);

  if (night==0){
    fill(255);
  }
  else {
    fill(0);
    }

  textFont(BOLD);
  text("Datum: "+weatherdays[1].date, 150, 210);
  textFont(NORMAL);
  text("Max. Temperatur: "+weatherdays[1].day.maxtemp_c, 150,230);
  text("Max. Temperatur: "+weatherdays[1].day.mintemp_c, 150,250);
}

function drawPosition2(){
  
  if (night==0){
    fill(255);
  }
  else {
    fill(0);
    }

  textSize(16);
  textFont(BOLD);
  text("Datum: "+weatherdays[2].date, 150, 320);
  textFont(NORMAL);
  text("Max. Temperatur: "+weatherdays[2].day.maxtemp_c, 150, 340);
  text("Max. Temperatur: "+weatherdays[2].day.mintemp_c, 150, 360); 
}

function drawPosition3(){

    if (night==0){
    fill(255);
  }
  else {
    fill(0);
    }

  textSize(16);
  textFont(BOLD);
  text("Datum: "+weatherdays[3].date, 150, 430);
  textFont(NORMAL);
  text("Max. Temperatur: "+weatherdays[3].day.maxtemp_c, 150, 450);
  text("Max. Temperatur: "+weatherdays[3].day.mintemp_c, 150, 470);   
}


//Rain

function drawRain0(){
  fill(74, 144, 226,100);
  noStroke();
  ellipse(80,90, rain[0].day.totalprecip_mm*10, rain[0].day.totalprecip_mm*10);
}

function drawRain1(){
  fill(74, 144, 226,100);
  noStroke();
  ellipse(80,210, rain[1].day.totalprecip_mm*10, rain[1].day.totalprecip_mm*10);
}

function drawRain2(){
  fill(74, 144, 226,100);
  noStroke();
  ellipse(80,320, rain[2].day.totalprecip_mm*10, rain[2].day.totalprecip_mm*10);
}

function drawRain3(){
  fill(74, 144, 226,100);
  noStroke();
  ellipse(80,440, rain[3].day.totalprecip_mm*10, rain[3].day.totalprecip_mm*10);
}

//Wind

function drawWind0(){
  fill(255,255,255,100);
  noStroke();
  ellipse(80,90, wind[0].day.maxwind_kph*5, wind[0].day.maxwind_kph*5);
}

function drawWind1(){
  fill(255,255,255,100);
  noStroke();
  ellipse(80,210, wind[1].day.maxwind_kph*5, wind[1].day.maxwind_kph*5);
}

function drawWind2(){
  fill(255,255,255,100);
  noStroke();
  ellipse(80,320, wind[2].day.maxwind_kph*5, wind[2].day.maxwind_kph*5);
}

function drawWind3(){
  fill(255,255,255,100);
  noStroke();
  ellipse(80,440, wind[3].day.maxwind_kph*5, wind[3].day.maxwind_kph*5);
}

function drawLegend1(){

  if (night==0){
    fill(255);
  }
  else {
    fill(0);
    }

  textFont(NORMAL);
  text("Niederschlag ", 170, 555);
  fill(74, 144, 226,100);
  noStroke();
  ellipse(150,550, 15, 15);
}


function drawLegend2(){

    if (night==0){
    fill(255);
  }
  else {
    fill(0);
    }

  textFont(NORMAL);
  text("Windstärke ", 170, 585);
  fill(255,255,255,100);
  noStroke();
  ellipse(150,580, 15, 15);
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
  night=weather.current.is_day;

  //console.log(is_day);

}