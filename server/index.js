const axios = require("axios");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = require('express')();
var express = require('express')
var http = require('http').Server(app);
const path = require('path')

const port = 80;

mongoose.connect('mongodb://admin:781227xy@ds251332.mlab.com:51332/pere-noel-secret', {useNewUrlParser: true});

app.use(express.static(path.resolve(__dirname, "../build")));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//MongoDB Models
var Participant = require("./participantModel");

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.get("/getNames", function(req, res) {
  var names = [];

  Participant.find({}, function(err, participants) {

    participants.map(participant => {
      if (participant.hasPicked != true)
        names.push(participant.name)
    })

    if (names.length === 0)
      return res.send(200, null)
    return res.send(200, names)

  })

})

app.post("/pick", function(req, res){
  Participant.findOne({name: req.body.name}, function(err, participant) {
    if (err) console.log(err);
    Participant.find({}, function(err, participants) {
      if (err) console.log(err);
      var availables = []
      participants.map(elem => {
        if (elem.wasPicked === false &&
            participant.exclude.indexOf(elem.name) == -1 &&
            elem.name != participant.name) availables.push(elem)
      })

      let random = Math.floor(Math.random() * availables.length);
      var picked = availables[random];
      picked.wasPicked = true;
      participant.hasPicked = true;
      participant.picked = picked.name;
      picked.save()
      participant.save()
      res.send(200, picked)
    })
  })
})

app.get('/UnePouleSurUnMur', function(req, res) {
  Participant.find({}, function(err, arr) {
    if (err) console.log(err);
    arr.map(e => {
      e.hasPicked = false;
      e.wasPicked = false;
      e.picked = "";
      e.save()
    })
    res.send(200, "good to go")
  })
})

http.listen(port, function () {
  console.log("listening on port " + port + '.');
});
