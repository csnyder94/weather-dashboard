const submitBtn = document.getElementById('search-button'); //Global variable for button from HTML
const searchInput = document.getElementById('search-input'); //Global variable for search input from actual webpage
const date = moment(); //Gets Date from moment.JS
const currentDate = date.format('MMMM Do, YYYY'); //Sets Date Format

function searchApi(searchTerm) {  //Function for Current Weather Data
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&APPID=adec8d3ec2d9ee881802e40b0d7fea07`

    fetch(url) //Fetches above URL with input paramaters taken from city search box included

        .then(function (response) {
            return response.json();
        }
        )

        .then(function (data) { //Uses data to console log and create local variables
            // console.log(data)

            let currentWeatherDisplay = $("<div>").append($("<p>").append($("<h2>").append(data.name + " (" + currentDate + ")", $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"))));
            let currentTemp = $('<p>').text('Temperature : ' + data.main.temp + ' °F ');
            let currentHumidity = $('<p>').text('Humidity : ' + data.main.humidity + '%');
            let currentWind = $('<p>').text('Wind Speed : ' + data.wind.speed + 'MPH');

            currentWeatherDisplay.append(currentTemp).append(currentHumidity).append(currentWind);  //Appends variables 
            $('#currentWeather').empty(); //Clears page first
            $('#currentWeather').append(currentWeatherDisplay); //Appends variables to page

            secondApiCall(data.coord.lat, data.coord.lon); //Calls for second API to use longitude and latitude from current city location data 
        }
        );
};

async function secondApiCall(lat, lon) {  //Function for Forecast Weather Data
    let secondUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&APPID=adec8d3ec2d9ee881802e40b0d7fea07`

    let data = await (await fetch(secondUrl)).json() //Fetches above URL with lat and lon paramaters pushed from first API
    console.log(data)

    let forecastList = data.list; //Creates array with data
    $('#fiveDayAppend').empty(); //Clears page first
    for (let i = 1; i < forecastList.length; i += 8) { //Uses for loop to iterate every 8th item (each day gives 8 objects of data)
        let firstForecast = forecastList[i]; //Creates Array of data
        let {   //Destructuring objects within data
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
        forecastDate = moment(forecastDate).format("MM/DD/YYYY")  //Turning data into variables to append
        let forecastDates = $('<p>').text(`${forecastDate}`);
        let forecastIcons = $("<img>").attr("src", "http://openweathermap.org/img/w/" + icon + ".png");
        let forecastTemps = $('<p>').text('Temperature : ' + temp + '°F ');
        let forecastHumidity = $('<p>').text('Humidity : ' + humidity + '%');
        let forecastWind = $('<p>').text('Wind Speed : ' + speed + 'MPH');
        let forecastWeatherData = $('<div>');
        forecastWeatherData.addClass('col forecast bg-primary text-white me-4'); //Creating class with bootstrap
        forecastWeatherData.append(forecastDates).append(forecastIcons).append(forecastTemps).append(forecastHumidity).append(forecastWind); //Appending variables

        $('#fiveDayAppend').append(forecastWeatherData); //Appending variabes to html page
        console.log(forecastList[i]);
    }
};
function saveSearch(searchTerm) { //Saves Searches
    let searchTermList = getSearches();
    const newSearchTermList = searchTermList.filter(city => city.toUpperCase() !== searchTerm.toUpperCase()); //Makes new list to remove duplicate buttons from being created (removes case-sensitivity cases also)
    newSearchTermList.push(searchTerm) //Pushes new search list
    localStorage.setItem("searchTerm", JSON.stringify(newSearchTermList)); //Sets to local storage
}

function getSearches(){ //Gets searches
return JSON.parse(localStorage.getItem("searchTerm")) || [];

}
const buttonContainer = $('#button-container'); // Get the button container element by id
buttonContainer.empty(); // Remove any existing buttons in the container

function createSearchButton(searchTerm){ //Creates searched cities buttons and styles them
    searchButton = $('<button>');
    searchButton.val(searchTerm);
    searchButton.text(searchTerm);
    searchButton.css('background-color', 'lightgray');
    searchButton.css('color', 'black');
    searchButton.css('display', 'block')
    searchButton.css('width', '100%')
    searchButton.css('margin-top', '10px')
    searchButton.css('border-radius', '4px')
    
    searchButton.click(event => {
        doTheSearch(searchTerm)
    }
    )
    
    return searchButton
}

function loadPreviousSearches() {
let searchTermList = getSearches()

$('#searchContainer').empty(); //Clears container of previous searched buttons

searchTermList.forEach(searchTerm => { 
  let searchButton = createSearchButton(searchTerm)
  
$('#searchContainer').append(searchButton) //Appending search buttons to html container
}
);
}

loadPreviousSearches(); //Calling function

function doTheSearch(searchTerm){ //Searches saves and load previous searches function
    searchApi(searchTerm);
    saveSearch(searchTerm);
    loadPreviousSearches();
}

submitBtn.addEventListener('click', function (event) { //Event listener for submit button click (Prevent Default and first API is called) (Also calls search)
    let searchTerm = searchInput.value
    event.preventDefault();
    console.log(event)
    doTheSearch(searchTerm)
}
);    
