// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//Timestamp Microservice Solution :D
app.get("/api/:dateInput",(req,res)=>{
  var inputValue=req.params.dateInput;
  var inputDate=new Date(inputValue).getTime();
  var inputTimeStamp=new Date(parseInt(inputValue)).getTime();
  
  if(inputDate>0)
  {
  res.json({
    unix:moment(inputValue).unix()*1000,
    utc:new Date(inputValue).toUTCString()
  })
}
else if(inputTimeStamp>0)
{
   res.json({
    unix:moment(parseInt(inputValue)).unix()*1000,
    utc:new Date(parseInt(inputValue)).toUTCString()
  })
}
else{
  res.json({
    error:"invalid date"
  });
}
});

app.get("/api",(req,res)=>{
  res.json({
    unix:moment().unix()*1000,
    utc:new Date().toUTCString()
  })
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
