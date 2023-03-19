const submitBtn = document.getElementById('search-button'); //Global letiable for button from HTML
const searchInput = document.getElementById('search-input'); //Global letiable for search input from actual webpage
const date = moment(); //Gets Date from moment.JS
const currentDate = date.format('MMMM Do, YYYY'); //Sets Date Format

function searchApi(event) {  //Function for Current Weather Data
    //let currentContainer = document.getElementById('currentWeather');
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=imperial&APPID=adec8d3ec2d9ee881802e40b0d7fea07`

    fetch(url) //Fetches above URL with input paramaters taken from city search box included

        .then(function (response) {
            return response.json();
        }
        )

        .then(function (data) { //Uses data to console log and create local letiables
            // console.log(data)

            let currentWeatherDisplay = $("<div>").append($("<p>").append($("<h2>").append(data.name + " (" + currentDate + ")", $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"))));
            let currentTemp = $('<p>').text('Temperature : ' + data.main.temp + ' °F ');
            let currentHumidity = $('<p>').text('Humidity : ' + data.main.humidity + '%');
            let currentWind = $('<p>').text('Wind Speed : ' + data.wind.speed + 'MPH');

            currentWeatherDisplay.append(currentTemp).append(currentHumidity).append(currentWind);  //Appends letiables set from above to page
            $('#currentWeather').empty(); //Clears page first
            $('#currentWeather').append(currentWeatherDisplay); //Appends letiables to page




            secondApiCall(data.coord.lat, data.coord.lon); //Calls for second API to use longitude and latitude from current city location data 
        }
        );
};

async function secondApiCall(lat, lon) {  //Function for Forecast Weather Data
    //let forecastContainer = document.getElementById('forecastWeather');
    let secondUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&APPID=adec8d3ec2d9ee881802e40b0d7fea07`

    let data = await (await fetch(secondUrl)).json() //Fetches above URL with lat and lon paramaters pushed from first API
    console.log(data)
    let forecastList = data.list; //Creates array with data
    for (let i = 1; i < forecastList.length; i += 8) { //Uses for loop to iterate every 8th item (each day gives 8 objects of data)
        // forecastWeatherDisplay = forecastList[i]
        let firstForecast = forecastList[i];
        let {
            dt_txt: forecastDate,
            main: {
                temp, 
                humidity
            },
            wind: {
                speed
            },
            weather: {
                0: {
                    icon
                }
            }
        } = firstForecast;
        forecastDate = moment(forecastDate).format("MM/DD/YYYY")
        let currentDate2 = $('<p>').text(`${forecastDate}`);
        let currentWeatherDisplay2 = $("<img>").attr("src", "http://openweathermap.org/img/w/" + icon + ".png");
        let currentTemp2 = $('<p>').text('Temperature : ' + temp + '°F ');
        let currentHumidity2 = $('<p>').text('Humidity : ' + humidity + '%');
        let currentWind2 = $('<p>').text('Wind Speed : ' + speed + 'MPH');
        let testTestTest = $('<div>');
        testTestTest.addClass('col forecast bg-primary text-white ml-3 mb-3 rounded>');
        testTestTest.append(currentDate2).append(currentWeatherDisplay2).append(currentTemp2).append(currentHumidity2).append(currentWind2);
        $('#fiveDayAppend').append(testTestTest);
        console.log(forecastList[i]);
        // console.log(firstForecast.dt_txt);  
    }
};

submitBtn.addEventListener('click', function (event) { //Event listener for submit button click (Prevent Default and first API is called)
    event.preventDefault();
    searchApi();
}
);    
