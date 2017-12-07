var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var request = require('request');
var mongoose= require('mongoose');
var options = { server: { socketOptions: {connectTimeoutMS: 30000 } }};
mongoose.connect('mongodb://drivyapp:azerty@ds131546.mlab.com:31546/drivybdd', options, function(err) {
  console.log(err);
});
var userSchema = mongoose.Schema({
    modele: String,
    marque: String,
    ville: String,
    places: String,
    lng: Number,
    lat: Number
});
var userModel = mongoose.model('User', userSchema);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.send('Hello');
});

app.get('/form', function (req, res) {
  res.render('form');
});

app.post('/formulaire', upload.array(), function (req, res) {
  console.log(req.body);

  request("https://maps.googleapis.com/maps/api/geocode/json?address="+req.body.ville+"&key=AIzaSyDgwAecvLC9cbyAdtBZQAfFmfP3dH4EQYk", function(error, response, data) {

    var data = JSON.parse(data);
    var lat = data.results[0].geometry.location.lat;
    var lon = data.results[0].geometry.location.lng;
    console.log(lat);
    console.log(lon);

  var user = new userModel ({
    name: req.body.modele,
    marque: req.body.marque,
    ville: req.body.ville,
    places: req.body.places,
    lng: lon,
    lat: lat
    });

    user.save(function (error, contact) {});

      });


  res.send('OK');
});

var port = (process.env.PORT || 8080);

app.listen(port, function () {
  console.log("Server listening on port 8080");
});

//il faut aussi utiliser Multer (à installer sur le terminal : npm install --save multer)
