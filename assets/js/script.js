var submitBtn = document.getElementById('search-button');
var searchInput = document.getElementById('search-input');

  function searchApi (event) {
    var issueContainer = document.getElementById('testtest');
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=imperial&APPID=adec8d3ec2d9ee881802e40b0d7fea07`
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            secondApiCall(data.coord.lat, data.coord.lon);
        }
        );
    };

    
  function secondApiCall (lat, lon) {
    var issueContainer = document.getElementById('testtest');
    var secondUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&APPID=adec8d3ec2d9ee881802e40b0d7fea07`
    fetch(secondUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.list)
            // we only want every 8 (run loop for 5 day)
        }
        );
    };

submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    searchApi();
}
);    
// var APIKey = adec8d3ec2d9ee881802e40b0d7fea07;
//iterate by 8 = i + 8
// url: "https://api.openweathermap.org/data/2.5/forecast?id=" + cityVal + "&units=imperial&APPID=" + APIKey;

 //   var userName = document.createElement ('p');
    //   userName.textContent = data.main.temp;
    //   issueContainer.append(userName); 