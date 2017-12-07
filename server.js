var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.send('Hello');
});

app.get('/form', function (req, res) {
  res.render('form');
});

app.get('/formulaire', function (req, res) {
  console.log(req.query.modele);
  res.send('OK');
});

var port = (process.env.PORT || 8080);

app.listen(port, function () {
  console.log("Server listening on port 8080");
});
