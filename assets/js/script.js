"api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}"

// Variables
// const apiOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=" + part + "&appid=56ef42523d8ac74ceb13ce7f908fa8e6";
// const apiFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName.value + "&appid=56ef42523d8ac74ceb13ce7f908fa8e6";

// Query Selecors
const cityName = document.querySelector("#cityName");
const searchBtn = document.querySelector("#searchBtn");
const searchHistory = document.querySelector("#searchHistory");

const cityInput = cityName["name"]

const allCities = JSON.parse(localStorage.getItem("allCities")) || [];

// var currentCity = ;

// Functions

const addCity = (name) => {
    allCities.push({
        name
    });

    localStorage.setItem("allCities", JSON.stringify(allCities));

    return {name};
};

const createSearchHistoryBtn = ({name}) => {
    // create elements
    const cityBtn = document.createElement("button");
    cityBtn.classList.add("searchHistory-append", "col-sm-10");

    // Fill the content
    cityBtn.innerHTML = name;

    // Add to the DOM
    searchHistory.appendChild(cityBtn);
};

allCities.forEach(createSearchHistoryBtn);

searchBtn.onclick = e => {

    e.preventDefault();
    // console.log("the onclick function for searchBtn is working!")

    const newCity = addCity(
        cityName.value
    );

    createSearchHistoryBtn(newCity);
    getLatLon(cityName.value);

    console.log();

};

var getLatLon = function(name) {

    console.log("getLatLon function is working!");

    var apiFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "&appid=56ef42523d8ac74ceb13ce7f908fa8e6";

    console.log(apiFiveDay);
    console.log(name)

    fetch(apiFiveDay)
        .then(res => res.json())
        .then(data => {
            console.log(data),
            console.log(name, data.city.coord.lat, data.city.coord.lon)
            getWeather(name, data.city.coord.lat, data.city.coord.lon)
        })
        console.log(data)

        console.log("fetch request has gone through");
};

var getWeather = function(city, lat, lon){
    console.log(city, lat, lon);

    var apiOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=9698d78e4b0b91d10c1cae15ee7197eb"
    console.log(apiOneCall)

    fetch(apiOneCall).then(function(res){
        if (res.ok){
            res.json().then(function(data){
                console.log(data)
                for(var i = 0; i < 6; i++){
                    if (i === 0){ //first index is today weather
                        displayCurrentWeather(city, data.daily[i].dt, data.daily[i].temp.day, data.daily[i].humidity, data.daily[i].wind_speed, data.daily[i].uvi);
                    } else { //the rest is 5 day forecast, need the icon for the image.
                        display5Day(data.daily[i].dt, data.daily[i].temp.day, data.daily[i].humidity, data.daily[i].wind_speed, data.daily[i].weather[0].icon, data.daily[i].weather[0].description);
                    }
                }
                
            })
        }
    })

};

//display the top half of the webpage (today or current weather condition)
var displayCurrentWeather = function(name, date, temp, humidity, wind_speed, uvi){

    console.log(name, date, temp, humidity, wind_speed, uvi)

    //arr to hold information to concat later
    var dataArr = [temp, humidity, wind_speed, uvi]
    var nameArr = ["Temp: ", "Wind: ", "Humidity: ", "UV Index: "]
    var unitArr = ["\u00B0F", " MPH", " %"]

    //converting binary time into UTC time
    var dateObj = new Date(date * 1000).toLocaleString();
    var convertDate = dateObj.slice(0,8);

    // var currentWeather = $("<div>").attr("id", "current").addClass("row current d-flex flex-column justify-content-around");
    var currentWeather = $("#cityWeather").addClass("row current d-flex flex-column justify-content-around");

    var h2El = $("<h2>").attr("id", "city-name").addClass("pl-3 pt-2").text(name.toUpperCase() + " (" + convertDate + ")");
    
    currentWeather.append(h2El) // append the city name and date.

    //append the temp, wind humidity and uv index
    for(var i = 0; i < 4; i++){
        if (i < 3){
            var pEl = $("<p>").attr("id", dataArr[i]).text(nameArr[i] + dataArr[i] + unitArr[i]);
            currentWeather.append(pEl);
        } else { // change the color of background of UV index depending on how high the UV index is serve as a warning. 
            var spanEl = $("<span>").addClass("text-light pl-3 pr-3 text-center").text(dataArr[i]);
            pEl = $("<p>").attr("id", dataArr[i]).text(nameArr[i]);

            if (dataArr[i] <= 2){
                spanEl.addClass("bg-success");
                pEl.append(spanEl);
                currentWeather.append(pEl);
            } else if ( dataArr[i] > 2 && dataArr[i] <= 5){
                spanEl.addClass("bg-warning");
                pEl.append(spanEl);
                currentWeather.append(pEl);
            } else if (dataArr[i] > 5 && dataArr[i] <= 10){
                spanEl.addClass("bg-danger");
                pEl.append(spanEl);
                currentWeather.append(pEl);
            } else {
                spanEl.addClass("bg-secondary");
                pEl.append(spanEl);
                currentWeather.append(pEl);
            }
        }
    }

    $("#result").append(currentWeather);

    create5DaySection(); //create the 5-day forecast section after the current section render

};

var create5DaySection = function(){
    var divEl = $("<div>").addClass("row-md d-flex flex-column justify-content-around forecast")
    var h2El = $("<h3>").text("5-Day Forecast:").addClass("pt-3 pb-2");
    var cardDiv = $("<div>").addClass("d-flex flex-row justify-content-between").attr("id", "5DayCard");

    divEl.append(h2El);
    divEl.append(cardDiv);

    $("#display-data").append(divEl)
}


// var test = () => {console.log(cityName.value)};
// test();



    // Old code ------------------------------------------------------------------------

// if (res.ok){
//     console.log(res.value);
//     res.JSON().then(function(data){
//         console.log("The function has responded successfuly");
//         console.log(data);
//     })
// } else {
//     console.log("error: please enter a valid city name");
// }


// var search = function() {
//         console.log("search function is working");
    
//     var city = $(this).siblings('textarea').val().trim();
//         console.log(city);
//         console.log(apiFiveDay);

//     localStore(city);
//     createHistoryBtn(city);
// };

// var createHistoryBtn = function(city) {
//     $.each(city, function(list, item) {
//         $('#search-history').append("<button id='appendBtn' class='search-history-append col-sm-10' >" + city + "</button>");

//     })
// };

// var fetchData = function(cityName){

//     console.log("This is the fetchData function " + cityName);


//     fetch(apiFiveDay).then(function(response){

//         console.log(response.json());

//         if (response.ok) {
//             console.log(response);
//             response.json().then(function(data){
//                 console.log(data);
//             })
//         } else {
//             alert("Error " + response.statusText);
//         }

//     })

//     console.log(fetch(apiFiveDay));

// };

// var loadData = function() {
//     var name = JSON.parse(localStorage.getItem("cityName"));

//     $.each(name, function(list, item){
//         createHistoryBtn(item);
//         console.log(item);
//     })
// };

// $('#search-btn').on('click', search);
