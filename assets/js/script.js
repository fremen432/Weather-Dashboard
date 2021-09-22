"api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}"

// Variables
// const apiOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=" + part + "&appid=56ef42523d8ac74ceb13ce7f908fa8e6";

// Query Selecors
const cityName = document.querySelector("#cityName");
const searchBtn = document.querySelector("#searchBtn");
const searchHistory = document.querySelector("#searchHistory");

const apiFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName.value + "&appid=56ef42523d8ac74ceb13ce7f908fa8e6";

const cityInput = cityName["name"]

const allCities = JSON.parse(localStorage.getItem("allCities")) || [];

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

    getLatLon();
    console.log();

};

var getLatLon = function() {

    console.log("getLatLon function is working!");
    // console.log(cityName.value);

    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName.value + "&appid=56ef42523d8ac74ceb13ce7f908fa8e6";

    console.log(apiUrl);

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => console.log(data))
        // .then(data => console.log(data.city.coord))

        console.log("fetch request has gone through");
        
    };
    
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
