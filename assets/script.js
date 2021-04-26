let city = $("#searchTerm").val();
const apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";
let date = new Date();

// function & event enabled for user to search terms, also prevent default enabled to prevent page refresh
$("#searchTerm").keypress(function (event) {

    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click();
    }
});


// search button on click will search the terms and pull from api accordingly
$("#searchBtn").on("click", function () {
    $('#forecastH5').addClass('show');
    city = $("#searchTerm").val();
    $("#searchTerm").val("");

// website pulling the api data
    const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
// googled math.floor via stackoverflow for assistance on development below
            let tempF = (response.amin.temp - 273.15) * 1.80 + 32;
            console.log(Math.floor(tempF))

            getCurrentConditions(response);
            getCurrentForecast(response);
            makeList();
        })
});