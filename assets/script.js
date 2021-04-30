let city = $("#searchTerm").val();
const apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";
let date = new Date();
const cities = [""]; 

localStorage.setItem("cities", JSON.stringify(cities))

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
 let cityHistory = JSON.parse(localStorage.getItem("cities"));
 let cityHistory2 = localStorage.getItem("cities");
 cityHistory.push(city)
 console.log(cityHistory2, 'this is a string')
  //localStorage.setItem(city, city);
  // website pulling the api data
  const queryURL =
  "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // googled math.floor via stackoverflow for assistance on development below
    let tempF = (response.list[0].main.temp - 273.15) * 1.8 + 32;
    console.log(Math.floor(tempF));

    // getCurrentConditions(response);
    getCurrentForecast(response);
    // makeList();
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

function getCurrentForecast(results) {
  // $.ajax({
  //     url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
  //     method: "GET"
  // }).then(function(response){
  //     console.log(response)
  //     console.log(response.dt)
  //     $('#forecast').empty();

  //     let results = response.list;
  //     console.log(results)
  console.log("hello");
  for (let i = 0; i < results.list.length; i++) {
    let day = Number(results.list[i].dt_txt.split("-")[2].split("")[0]);
    let hour = results.list[i].dt_txt.split("-")[2].split(" ")[1];
    // console.log(day);
    // console.log({hour}, typeof hour);
    let key = results.list[i];
    // console.log(key)
    //  console.log(hour == "12:00:00")
    if (hour == "12:00:00") {
      console.log("it's the hour ");
      //   console.log('hour')
      let temp = (results.list[i].main.temp - 273.15) * 1.8 + 32;
      let tempF = Math.floor(temp);
      // console.log(tempF)

          const card = $("<div>").addClass("card col-md ml-4 bg-primary text-white");
          console.log(card)
          const cardBody = $("<div>").addClass("card-body p-3 forecastBody");
          const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
          const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF +  " °F");
          const humidity =  $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results.list[i].main.humidity + "%");
          const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results.list[i].weather[0].icon + ".png")

          cardBody.append(cityDate, image, temperature, humidity);
        console.log(card)
          card.append(cardBody);
          console.log(card)
          $("#forecast").append(card);
    }
  }
  // });
}
