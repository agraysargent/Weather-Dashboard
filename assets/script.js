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
  $("#forecastH5").addClass("show");
  city = $("#searchTerm").val();
  $("#searchTerm").val("");

  // website pulling the api data
  const queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // googled math.floor via stackoverflow for assistance on development below
    let tempF = (response.amin.temp - 273.15) * 1.8 + 32;
    console.log(Math.floor(tempF));

    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList();
  });
});

// console log displaying errors for line 2 in script

function makeList() {
  let listItem = $("<li>").addClass("list-group-item").text(city);
  $(".list").append(listItem);
}

// googled math.floor via stackoverflow for assistance on development below (again)
function getCurrentConditions(response) {
  let tempF = (response.main.temp - 273.15) * 1.8 + 32;
  tempF = Math.floor(tempF);

  $("#currentCity").empty();

  const card = $("<div>").addClass("card");
  const cardBody = $("<div>").addClass("card-body");
  const city = $("<h4>").addClass("card-title").text(response.name);
  const cityDate = $("<h4>")
    .addClass("card-title")
    .text(date.toLocaleDateString("en-US"));
  const temperature = $("<p>")
    .addClass("card-text current-tempt")
    .text("Temperature: " + tempF + "  °F");
  const humidity = $("<p>")
    .addClass("card-text current-humidty")
    .text("Humidty: " + response.main.humdity + "%");
  const wind = $("<p>")
    .addClass("card-text current-wind")
    .text("Wind Speed: " + response.wind.speed + "MPH");
  const image = $("<img>").attr(
    "src",
    "https://openweathermap.org/img/w" + response.weather[0].icon + ".png"
  );

  city.append(cityDate, image);
  cardBody.append(city, temperature, humidity, wind);
  card.append(cardBody);
  $("#currentCity").append(card);
}

function getCurrentForecast () {
$.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET"
}).then(function(response){
    console.log(response)
    console.log(response.dt)
    $('#forecast').empty();

    let results = response.list;
    console.log(results)

    for (let i = 0; i < results.length; i++){
        let day = Number(results[i].dt_txt.split('-')[2].split('')[0]);
        let hour = results[i].dt_txt.split('-')[2].split(' ')[1];
        console.log(day);
        console.log(hour);

        if(results[i].dt_txt.indexOf("12:00:00") !== -1){
            let temp = (results[i].main.temp - 273.15) * 1.80 + 32;
            let tempF = Math.floor(temp);

            const card = $("<div>").addClass("card col-md ml-4 bg-primary text-white");
            const cardBody = $("<div>").addClass("card-body p-3 forecastBody");
            const cityDate = $("<h4").addClass("card-title").text(date.toLocaleDateString('en-US'));
            const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF +  " °F");
            const humdity =  $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");
            const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

            cardBody.append(cityDate, image, temperature, humidity);
            card.append(cardBody);
            $("#forecast").append(card);
        }
    }
});

}