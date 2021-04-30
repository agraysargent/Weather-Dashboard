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
  $("#forecast").empty();
  city = $("#searchTerm").val();
let cityHistory = JSON.parse(localStorage.getItem("cities"));
cityHistory.push(city)
console.log(cityHistory, 'this has the new search term')
localStorage.setItem("cities", JSON.stringify(cityHistory));
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

    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList(city);
  });
});

// console log displaying errors for line 2 in script

function makeList(city) {
  let listItem = $("<li>").addClass("list-group-item").text(city);
  $(".list").append(listItem);
}

// googled math.floor via stackoverflow for assistance on development below (again)
function getCurrentConditions(response) {
  let tempF = (response.list[0].main.temp - 273.15) * 1.8 + 32;
  tempF = Math.floor(tempF);
  console.log(response.list[0].weather[0].icon)
  $("#currentCity").empty();

  const card = $("<div>").addClass("card");
  const cardBody = $("<div>").addClass("card-body");
  const city = $("<h4>").addClass("card-title").text(response.list[0].main.name);
  const cityDate = $("<h4>")
    .addClass("card-title")
    .text(date.toLocaleDateString("en-US"));
  const temperature = $("<p>")
    .addClass("card-text current-tempt")
    .text("Temperature: " + tempF + "  °F");
  const humidity = $("<p>")
    .addClass("card-text current-humidty")
    .text("Humidity: " + response.list[0].main.humidity + "%");
  const wind = $("<p>")
    .addClass("card-text current-wind")
    .text("Wind Speed: " + response.list[0].wind.speed + "MPH");
  const image = $("<img>").attr(
    "src",
    "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png"
  );

  city.append(cityDate, image);
  cardBody.append(city, temperature, humidity, wind);
  card.append(cardBody);
  $("#currentCity").append(card);
}

function getCurrentForecast(results) {
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
          const cardBody = $("<div>").addClass("card-body p-3 forecastBody");
          const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
          const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF +  " °F");
          const humidity =  $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results.list[i].main.humidity + "%");
          const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results.list[i].weather[0].icon + ".png")

          cardBody.append(cityDate, image, temperature, humidity);
          card.append(cardBody);
          $("#forecast").append(card);
    }
  }
  // });
}
