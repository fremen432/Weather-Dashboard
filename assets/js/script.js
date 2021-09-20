"api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}"

// Variables
var apiFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=56ef42523d8ac74ceb13ce7f908fa8e6;
// var apiOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=" + part + "&appid=" + apiKey;

// Query Selecors
var cityName = document.querySelector("#cityName");
var searchBtn = document.querySelector("#searchBtn");

// Functions

var search = function() {
        console.log("search function is working");
    
    var city = $(this).siblings('textarea').val().trim();
        console.log(city);
        console.log(apiFiveDay);

    localStore(city);
    createHistoryBtn(city);
};

// Save data to local storage
var localStore = function(city){
    window.localStorage.setItem('cityName', city);
};

var createHistoryBtn = function(city) {
    $.each(city, function(list, item) {
        $('#search-history').append("<button id='appendBtn' class='search-history-append col-sm-10' >" + city + "</button>");

    })
};

var fetchData = function(cityName){

    // alert("This is the fetchData function " + cityName);


    fetch(apiFiveDay).then(function(response){

        console.log(response.json());


        // if (response.ok) {
        //     console.log(response);
        //     response.json().then(function(data){
        //         console.log(data);
        //     })
        // } else {
        //     alert("Error " + response.statusText);
        // }

    })

console.log(fetch(apiFiveDay));

};

var loadData = function() {
    var name = JSON.parse(localStorage.getItem("cityName"));

    $.each(name, function(list, item){
        createHistoryBtn(item);
        console.log(item);
    })
};

$('#search-btn').on('click', search);

loadData();
