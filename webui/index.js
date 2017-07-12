var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
var router = express.Router();

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
router.get("/app/student", function(req, res) {
    res.render('studentapp')
});

//Student Application
router.get("/app/instructor", function(req, res) {
    res.render('instructorapp')
});

//Init router path
app.use('/', router);

//Start up server
app.listen(3000, function(){
  console.log('Live at Port 3000');
});