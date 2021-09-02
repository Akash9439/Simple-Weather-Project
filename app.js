const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    console.log(req.body.CityName);
        const query = req.body.CityName;
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=2bc36763a84b8dde1610d62602e8d0f4";
         
         https.get(url, function(response){
     
            console.log(response.statusCode);
             
             response.on("data", function(data){
                const weatherData = JSON.parse(data)
                 const icon = weatherData.weather[0].icon
                 const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
                 const temp = weatherData.main.temp
                 const weatherDescription = weatherData.weather[0].description
                 res.write("<p>The weather is curretly "+ weatherDescription +".</p>");
                 res.write("<h1>The current tempereture is " + temp + " degree farahnite.</h1>");
                 res.write("<image src="+ imageURL +"></image>");
                 res.send();
            })
        })
})






app.listen(3000,function(){
    console.log("Server is running at port 3000.");
})
