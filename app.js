const https = require('https');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    
})
app.post('/', function(req, res){
    console.log(req.body.cityName);
    const cityn = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=1cccb6230de52e68b986892ffc6727cc&q="+cityn+"&units=metric";
    https.get(url,function(r){
        console.log(r.statusCode);
        if(r.statusCode === 200){
        r.on("data",function(data){
            const weaData = JSON.parse(data);
            const temperature=weaData.main.temp;
            const imagepath= weaData.weather[0].icon;
            const icon = 'http://openweathermap.org/img/wn/'+imagepath+'@2x.png';
            console.log(weaData.weather[0].description);
            res.write("<p>The weather is "+weaData.weather[0].description+"</p><br>");
            res.write("<h3>The temperature is "+temperature+"</h3>");
            res.write("<img src="+icon+">");
            res.send();
        })
    }
    else{
        res.write("<h3>City not found</h3>");
        res.send();
    }
    })
})
app.listen("3000",()=>{
    console.log("server is running on port 3000");
})