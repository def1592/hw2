let displayError = function(error) {
  console.debug(error);
  window.alert("Sorry, something went wrong.");
}
let consoleLocation = function(position){
  console.log('Your Latitude: ' + position.coords.latitude.toString())
  console.log('Your Longitude: ' + position.coords.longitude.toString())
}
navigator.geolocation.getCurrentPosition(consoleLocation, displayError)

let getWeather = function() {
  // let latitude = '41.8781';
  // let longitude = '-87.6298';
  navigator.geolocation.getCurrentPosition(function(position){
    let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
    var latitude = position.coords.latitude
    var longitude = position.coords.longitude
    openweathermap_api_url += 'lat=' + latitude
    openweathermap_api_url += '&lon=' + longitude
    openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'

    fetch(openweathermap_api_url).then(convertToJSON).then(updateWeather).catch(displayError);
  })
}

let link = document.getElementById("get_forecast")
link.addEventListener("click", getWeather)

let convertToJSON = function(response) {
  return response.json();
}


let updateWeather = function(dataFromService) {
  city = dataFromService.name
  temp = dataFromService.main.temp
  document.querySelector('.card-title').innerHTML = city;
  document.querySelector('.card-text').innerHTML = "It is " + temp + " degrees outside.";
  document.querySelector('.card-img-top').src = "http://openweathermap.org/img/w/" + dataFromService.weather[0].icon + ".png";
}


// HINT:
// Weather icon example: http://openweathermap.org/img/w/10d.png
// The very last part ('10d.png') can change based on the current conditions.
