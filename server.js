var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
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

app.post('/formulaire', upload.array() function (req, res) {
  console.log(req.body);
  res.send('OK');
});

var port = (process.env.PORT || 8080);

app.listen(port, function () {
  console.log("Server listening on port 8080");
});

//il faut aussi utiliser Multer (à installer sur le terminal : npm install --save multer)
