var submitBtn = document.getElementById('search-button'); //Global variable for button from HTML
var searchInput = document.getElementById('search-input'); //Global variable for search input from actual webpage
var date = moment(); //Gets Date from moment.JS
var currentDate = date.format('MMMM Do, YYYY'); //Sets Date Format

function searchApi (event) {  //Function for Current Weather Data
var currentContainer = document.getElementById('currentWeather');
var url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=imperial&APPID=adec8d3ec2d9ee881802e40b0d7fea07`
    
fetch(url) //Fetches above URL with input paramaters taken from city search box included

    .then(function (response) {
        return response.json();
    }
    )

    .then(function (data) { //Uses data to console log and create local variables
        console.log(data)

        var currentWeatherDisplay = $("<div>").append($("<p>").append($("<h2>").append(data.name + " (" + currentDate + ")", $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"))));
        var currentTemp = $('<p>').text('Temperature : ' + data.main.temp + ' °F ' );
        var currentHumidity = $('<p>').text('Humidity : ' + data.main.humidity + '%');
        var currentWind = $('<p>').text('Wind Speed : ' + data.wind.speed + 'MPH');       
        
        currentWeatherDisplay.append(currentTemp).append(currentHumidity).append(currentWind);  //Appends variables set from above to page
        $('#currentWeather').empty(); //Clears page first
        $('#currentWeather').append(currentWeatherDisplay); //Appends variables to page

        secondApiCall(data.coord.lat, data.coord.lon); //Calls for second API to use longitude and latitude from current city location data 
    }
    );        
};
    
function secondApiCall (lat, lon) {  //Function for Forecast Weather Data
var forecastContainer = document.getElementById('forecastWeather');
var secondUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&APPID=adec8d3ec2d9ee881802e40b0d7fea07`

fetch(secondUrl) //Fetches above URL with lat and lon paramaters pushed from first API

    .then(function (response) {
         return response.json();
    }
    )
    
    .then(function (data) { //Uses data to console log and create local variables
    var forecastList = data.list; //Creates array with data
        for (var i = 0; i < forecastList.length; i+=8) { //Uses for loop to iterate every 8th item (each day gives 8 objects of data)
                 
        console.log(forecastList[i]);            
    }
    }
    );
};

submitBtn.addEventListener('click', function (event) { //Event listener for submit button click (Prevent Default and first API is called)
    event.preventDefault();
    searchApi();
}
);    
