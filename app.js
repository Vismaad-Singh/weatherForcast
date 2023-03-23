const express = require("express");
const https = require("https");


const app = express();
const port = 3000;
app.listen(3000, () => {
  console.log("Server is running on port ", port);
});

app.get("/", (req, res) => {
  
  res.sendFile(__dirname + "/index.html");
  
  
});
app.use(express.urlencoded({ extended: true }));


app.post("/", (req,res)=>{
 
  const query = req.body.cityName;
const apiKey = "dc99ae23aa95c8cc3b355b0f333ad257";
const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiKey + "&units="+ units;
  https.get(url , (response)=>{
      console.log("Status Code: " + response.statusCode);

      response.on("data", (data)=>{
          const weatherData = JSON.parse(data)
          const temp = Math.floor(weatherData.main.temp);
          const description = weatherData.weather[0].description;

          console.log(description);
          res.write("<h1>The temperatur in "+ req.body.cityName + " is " + temp + " degrees Celcius.</h1>");         
          res.write("<p>The weather is currently " + description + "</p>");
          res.send();
      });
    });
})



