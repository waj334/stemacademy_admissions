var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
var router = express.Router();
var apiUrl = 'http://localhost:8080'

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(cookieParser());

app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/img'));

//Module routing
app.use('/semantic/dist',
        express.static(__dirname + '/semantic/dist'));

//Default Page
router.get("/",function(req, res){
    res.render('index');
});

//Student Application
router.get('/app/student', function(req, res) {
    res.render('studentapp')
});

//Student Application Confirmation Generator
router.post('/app/student/confirm', function(req, res) {
    var data = JSON.parse(req.body.json);
    res.render('confstudentapp', {'data': data});
});

//Student Application submission
//Login
router.post('/app/student/submit', function(req, res, next) {
    var attr = {
        headers: {'content-type': 'application/json'},
        url: apiUrl + '/student/submission',
        body: JSON.stringify(req.body)
    }

    //Make API call to login
    request.post(attr, function(error, resp, body) { 

    });
});

//Student Application
router.get('/app/instructor', function(req, res) {
    res.render('instructorapp')
});

//Init router path
app.use('/', router);

//Start up server
app.listen(3000, function(){
  console.log('Live at Port 3000');
});