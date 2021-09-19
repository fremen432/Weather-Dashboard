"api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}"

// Query Selectors

// Variables
var cityName = document.querySelector("#city-name");
var searchBtn = document.querySelector("#search-btn");


var apiFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

// var apiOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=" + part + "&appid=" + apiKey;

const apiKey = "56ef42523d8ac74ceb13ce7f908fa8e6";


// Functions



var search = function() {

    var city = $(this).siblings('textarea').val().trim();

    

    // Save data to local storage
    saveData(city[i]);

    // Append searched city name as a button and append to "Search History" div
    $('#search-history').append("<button id='appendBtn' class='search-history-append col-sm-10' >" + city[i] + "</button>")
    $('#appendBtn').click(function(){

    
    alert("You have clicked on " + city[i]);

    });
    console.log(city);

    fetchData(city);
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

    // fetch(apiFiveDay);

    };



// Save data to local storage
var saveData = function(city){

    window.localStorage.setItem('City Name', city);
}

// var test = function(){

//     console.log(cityName);
// };

// Event listener
// cityName.addEventListener('submit', test);

$('#search-btn').on('click', search);


