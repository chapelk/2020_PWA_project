
const express = require('express')
const mongoose = require('mongoose');
var fs = require('fs');
var https = require('https');

var cors = require('cors')
const app = express()
var schema = new mongoose.Schema({ author: 'string', joke: 'string' });
var Joke = mongoose.model('Joke', schema);

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(cors())

app.post('/joke', function (req, res) {
    Joke.create({
        author: req.body.author,
        joke: req.body.joke
    }, function(err, joke) {
        if (err) return handleError(err);
    })
    res.sendStatus(200, '/');
})

app.get('/allJoke', function (req, res) {
    Joke.find({}, function(err, jokes) {
        res.send({jokes: jokes});
     });
})

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/html/index.html')
})

app.get('/css/style.css', function (req, res) {
    res.sendFile(__dirname+'/css/style.css')
})

app.get('/css/bootstrap.min.css', function (req, res) {
    res.sendFile(__dirname+'/css/bootstrap.min.css')
})

app.get('/js/bootstrap.min.js', function (req, res) {
    res.sendFile(__dirname+'/js/bootstrap.min.js')
})

app.get('/js/main.js', function (req, res) {
    res.sendFile(__dirname+'/js/main.js')
})

app.get('/services.js', function (req, res) {
    res.sendFile(__dirname+'/services.js')
})

app.get('/js/popper.js', function (req, res) {
    res.sendFile(__dirname+'/js/popper.js')
})

app.get('/js/jquery.js', function (req, res) {
    res.sendFile(__dirname+'/js/jquery.js')
})

app.get('/images/hello-icon-128.png', function (req, res) {
    res.sendFile(__dirname+'/images/hello-icon-128.png')
})

app.get('/images/hello-icon-144.png', function (req, res) {
    res.sendFile(__dirname+'/images/hello-icon-144.png')
})

app.get('/images/hello-icon-152.png', function (req, res) {
    res.sendFile(__dirname+'/images/hello-icon-152.png')
})

app.get('/images/hello-icon-192.png', function (req, res) {
    res.sendFile(__dirname+'/images/hello-icon-192.png')
})

app.get('/images/hello-icon-512.png', function (req, res) {
    res.sendFile(__dirname+'/images/hello-icon-512.png')
})

app.get('/images/hello-icon-256.png', function (req, res) {
    res.sendFile(__dirname+'/images/hello-icon-256.png')
})

app.get('/images/profile_400x400.png', function (req, res) {
    res.sendFile(__dirname+'/images/profile_400x400.png')
})

app.get('/create', function (req, res) {
    res.sendFile(__dirname+'/html/create.html')
})

app.get('/list', function (req, res) {
    res.sendFile(__dirname+'/html/list.html')
})


   

mongoose.connect('mongodb://localhost:27017/db')
  .then(() => {
    console.log('mongodb started.');
    https.createServer({
        key: fs.readFileSync('privateKey.key'),
        cert: fs.readFileSync('certificate.crt')
      }, app).listen(8000, () => {
      });
  }).catch((err) => {
    console.log('Mongodb connection failed.' +err);
  })