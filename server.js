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
app.get("/", (req, res)=>{
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", (req, res)=>{
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", (req, res)=>{
  let response = {
    unix: Math.round(new Date().getTime()/1000)*1000,
    utc: new Date().toUTCString()
  }
  res.json(response)
})

app.get("/api/timestamp/:date", (req, res)=>{
  let param = req.params.date
  let unix
  let date
  let response = {}

  if(isNaN(param)){
    date = new Date(param)
    if(date=="Invalid Date"){
      res.json({ error : "Invalid Date" })
    }
    unix = Math.round(date.getTime()/1000)*1000;
  }else{
    let unix_timestamp = parseInt(req.params.date)
    date = new Date(unix_timestamp)
    unix = unix_timestamp
  }

  // if(!param.includes("-") && !param.includes("/") && !param.includes(".")){
  //   let unix_timestamp = parseInt(req.params.date)
  //   date = new Date(unix_timestamp)
  //   unix = unix_timestamp
  // }else{
  //   date = new Date(param)
  //   if(date=="Invalid Date"){
  //     console.log("hehe invalid bro")
  //     res.status(400).json({error:"Invalid Date"})
  //   }
  //   unix = Math.round(date.getTime()/1000)*1000;
  // }

  response.unix = unix
  response.utc = date.toUTCString()

  res.json(response)
})



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
