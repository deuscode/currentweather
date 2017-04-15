var API_KEY = "a527766960d7d37544528f585a1d3885";
var ctemp = false;
var weatherData;
var forecastFive;
var forecastSixteen;

function displayTemp(ftemp, ctemp) {
    if (ctemp) return Math.round((ftemp - 32) * (5 / 9)) + " C";
    return Math.round(ftemp) + " F";
}

function render(weatherData, ctemp) {
    var currentLocation = weatherData.name;
    var countryCode = weatherData.sys.country;
    var currentWeather = weatherData.weather[0].description;
    var currentTemp = displayTemp(weatherData.main.temp, ctemp);
    var high = displayTemp(weatherData.main.temp_max, ctemp);
    var low = displayTemp(weatherData.main.temp_min, ctemp);
    var icon = weatherData.weather[0].icon;

    $('#location').html(currentLocation);
    $('#location').append(", " + countryCode);
    $('#currenttemp').html(currentTemp);
    $('#currentWeather').html(currentWeather);
    $('#temp-highlow').html(high + " / " + low);

    var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
    $('#currenttemp').append(' <img src="' + iconURL + '">')
}

$(document).ready(function () {

    var locationData;
    $.getJSON('http://ipinfo.io', function (ipdata) {
        console.log("assigning the location data...")
        locationData = ipdata.loc.split(",");
        console.log("longitude & latitude: ", locationData);

        $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + locationData[0] + '&lon=' +
            locationData[1] + '&APPID=' + API_KEY, function (mainWeather) {
                weatherData = mainWeather;
                console.log(weatherData);
                render(mainWeather, ctemp);

                $('#toggle').click(function(event){
                    ctemp = !ctemp;
                    render(weatherData, ctemp);
                    event.preventDefault();
                });
            });

        $.getJSON('http://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=' + locationData[0] + '&lon=' +
            locationData[1] + '&APPID=' + API_KEY, function (fiveDayData) {
                forecastFive = fiveDayData;
                console.log(forecastFive);
                render(fiveDayData, ctemp);

                $('#toggle').click(function(event){
                    ctemp = !ctemp;
                    render(forecastFive, ctemp);
                    event.preventDefault();
                });
            });

    });
});