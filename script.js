var API_KEY = "";

var ctemp = false;

var weatherData;
var forecastFive;

var day = new Date();
var today = day.getDay();

var weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September',
    'October', 'November', 'December');

var forecastDayOne = today + 1;
var forecastDayTwo = today + 2;
var forecastDayThree = today + 3;
var forecastDayFour = today + 4;
var forecastDayFive = today + 5;

function date_time() {
    date = new Date;
    year = date.getFullYear();
    month = date.getMonth();
    d = date.getDate();
    day = date.getDay();
    h = date.getHours();
    if (h < 10) {
        h = "0" + h;
    }
    m = date.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    s = date.getSeconds();
    if (s < 10) {
        s = "0" + s;
    }
    result = '' + weekday[day] + ' ' + months[month] + ' ' + d + ' ' + year + ' ' + h + ':' + m + ':' + s;
    document.getElementById('date_time').innerHTML = result;
    var t = setTimeout(date_time, '1000');
    return true;
}

function dayFinder(currentDay) {
    var n = currentDay;
    if (n > 6) {
        return n - 7;
    } else {
        return n;
    }
}

function displayTemp(ftemp, ctemp) {
    if (ctemp) return Math.round((ftemp - 32) * (5 / 9)) + " C";
    return Math.round(ftemp) + " F";
}

function renderCurrent(weatherData, ctemp) {
    var currentLocation = weatherData.name;
    var countryCode = weatherData.sys.country;
    var currentWeather = weatherData.weather[0].description;
    var currentTemp = displayTemp(weatherData.main.temp, ctemp);
    var high = displayTemp(weatherData.main.temp_max, ctemp);
    var low = displayTemp(weatherData.main.temp_min, ctemp);
    var icon = weatherData.weather[0].icon;

    $('#location').html(currentLocation);
    $('#location').append(", " + countryCode);
    $('#currenttemp').html("Now: " + currentTemp);
    $('#currentWeather').html(currentWeather);
    $('#temp-highlow').html(high + " / " + low);

    var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
    $('#currenttemp').prepend(' <img src="' + iconURL + '"> <br>')
}

function renderFive(forecastFive, ctemp) {
    //Day One - Temp
    var dayOneHigh = displayTemp(forecastFive.list[0].temp.max, ctemp);
    var dayOneLow = displayTemp(forecastFive.list[0].temp.min, ctemp);
    var dayOneWeather = forecastFive.list[0].weather[0].description;
    var dayOneIcon = forecastFive.list[0].weather[0].icon;
    //Day Two - Temp
    var dayTwoHigh = displayTemp(forecastFive.list[1].temp.max, ctemp);
    var dayTwoLow = displayTemp(forecastFive.list[1].temp.min, ctemp);
    var dayTwoWeather = forecastFive.list[1].weather[0].description;
    var dayTwoIcon = forecastFive.list[1].weather[0].icon;
    //Day Three - Temp
    var dayThreeHigh = displayTemp(forecastFive.list[2].temp.max, ctemp);
    var dayThreeLow = displayTemp(forecastFive.list[2].temp.min, ctemp);
    var dayThreeWeather = forecastFive.list[2].weather[0].description;
    var dayThreeIcon = forecastFive.list[2].weather[0].icon;
    //Day Four - Temp
    var dayFourHigh = displayTemp(forecastFive.list[3].temp.max, ctemp);
    var dayFourLow = displayTemp(forecastFive.list[3].temp.min, ctemp);
    var dayFourWeather = forecastFive.list[3].weather[0].description;
    var dayFourIcon = forecastFive.list[3].weather[0].icon;
    //Day Five - Temp
    var dayFiveHigh = displayTemp(forecastFive.list[4].temp.max, ctemp);
    var dayFiveLow = displayTemp(forecastFive.list[4].temp.min, ctemp);
    var dayFiveWeather = forecastFive.list[4].weather[0].description;
    var dayFiveIcon = forecastFive.list[4].weather[0].icon;

    //Day One - Data Pass to HTML
    $('#dayone').html(weekday[dayFinder(forecastDayOne)]);
    $('#dayone-highlow').html(dayOneHigh + " / " + dayOneLow);
    $('#dayone-weather').html(dayOneWeather);
    var dayOneIconURL = "http://openweathermap.org/img/w/" + dayOneIcon + ".png";
    $('#dayoneIcon').html('<img src="' + dayOneIconURL + '">');

    //Day Two - Data Pass to HTML
    $('#daytwo').html(weekday[dayFinder(forecastDayTwo)]);
    $('#daytwo-highlow').html(dayTwoHigh + " / " + dayTwoLow);
    $('#daytwo-weather').html(dayTwoWeather);
    var dayTwoIconURL = "http://openweathermap.org/img/w/" + dayTwoIcon + ".png";
    $('#daytwoIcon').html('<img src="' + dayTwoIconURL + '">');

    //Day Three - Data Pass to HTML
    $('#daythree').html(weekday[dayFinder(forecastDayThree)]);
    $('#daythree-highlow').html(dayThreeHigh + " / " + dayThreeLow);
    $('#daythree-weather').html(dayThreeWeather);
    var dayThreeIconURL = "http://openweathermap.org/img/w/" + dayThreeIcon + ".png";
    $('#daythreeIcon').html('<img src="' + dayThreeIconURL + '">');

    //Day Four - Data Pass to HTML
    $('#dayfour').html(weekday[dayFinder(forecastDayFour)]);
    $('#dayfour-highlow').html(dayFourHigh + " / " + dayFourLow);
    $('#dayfour-weather').html(dayFourWeather);
    var dayFourIconURL = "http://openweathermap.org/img/w/" + dayFourIcon + ".png";
    $('#dayfourIcon').html('<img src="' + dayFourIconURL + '">');

    //Day Five - Data Pass to HTML
    $('#dayfive').html(weekday[dayFinder(forecastDayFive)]);
    $('#dayfive-highlow').html(dayFiveHigh + " / " + dayFiveLow);
    $('#dayfive-weather').html(dayFiveWeather);
    var dayFiveIconURL = "http://openweathermap.org/img/w/" + dayFiveIcon + ".png";
    $('#dayfiveIcon').html('<img src="' + dayFiveIconURL + '">');

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
                renderCurrent(weatherData, ctemp);

                $('#toggle').click(function (event) {
                    ctemp = !ctemp;
                    renderCurrent(weatherData, ctemp);
                    renderFive(forecastFive, ctemp);
                    event.preventDefault();

                });
            });

        $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?units=imperial&lat=' + locationData[0] + '&lon=' +
            locationData[1] + '&cnt=5&APPID=' + API_KEY, function (fiveDayData) {
                forecastFive = fiveDayData;
                console.log(forecastFive);
                renderFive(forecastFive, ctemp);



            });
    });

});
