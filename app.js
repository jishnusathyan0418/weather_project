const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res){
  const query = req.body.cityName;
  const id = "5b65c16a614be9879bffa5dfda7d7a43";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + id + "&units=" + unit;
  https.get(url, function(responce) {

    responce.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.humidity;
      console.log(temp);
      const weather = weatherData.weather[0].description;
      console.log(weather);
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/w/" + icon + ".png";


      res.write("<p> The weather is currently " + weather + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " digree celsius.<h1>");
      res.write("<img src=" + imageUrl + ">");
      res.send();
    })
  })
})





app.listen(3000, function() {
  console.log("server running");
});
