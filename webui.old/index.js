var express = require('express');
var helmet = require('helmet');
var session = require('express-session');
var memcachedstore = require('connect-memcached')(session);
var request = require('request');
request.debug = true;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');

var configPath = 'config.json'

//Get path to config file
if (process.argv.length > 2)
    configPath = process.argv[2];

//Read config
var config = JSON.parse(fs.readFileSync(configPath));

var app = express();
var router = express.Router();
var apiUrl = 'http://localhost:' + config.servicePort;

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//Security stuff
app.use(helmet());
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(session({
    saveUninitialized: false,
    secret: 'sup3rs3cur3',
    resave: true,
    name: 'sessionId',
    store: new memcachedstore({
        hosts: ['127.0.0.1:11211'],
        secret: 'als0s3cr3tlys3cur3'
    })
}));

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
        method: "POST",
        headers: {'content-type': 'application/json'},
        url: apiUrl + '/app/student/submit',
        body: JSON.stringify(req.body)
    }

    function callback(error, resp, body) { 
        if (error) {
                if (error.errno == 'ECONNREFUSED')
                    res.sendStatus(500);
            } else {
                res.sendStatus(200);
                next();
            }
    }

    //Make API call to student form submission
    request(attr, callback)
});

//Instructor Application
router.get('/app/instructor', function(req, res) {
    res.render('instructorapp')
});

//Admin Panel
router.get('/admin/session/login', function(req, res) {
    res.render('adminlogin')
});

//Admin login
router.post('/admin/session/login', function(req, res, next) {
    var attr = {
        headers: {'content-type': 'application/json'},
        url: apiUrl + '/admin/session/login',
        body: JSON.stringify(req.body)
    }

    function callback(error, response, body) { 
        if (error) {
            console.log(error);
        } else {
            if (response.statusCode == 200) {
                //Store session token
                var token = JSON.parse(response.body).tokenId

                req.session.regenerate(function(){
                    req.session.user = token;
                });

                res.sendStatus(200);
                next();
            } else {
                res.sendStatus(response.statusCode)
            }
        }
    }

    //Make API call to login
    request.post(attr, callback);
});

//Admin view auth
var auth = function(req, res, next) {

}

//Admin view
router.get('/admin/main', function(req, res) {
    res.render('dashboard')
});

//Init router path
app.use('/', router);

//Start up server
var port = parseInt(config.clientPort);
app.listen(port, function(){
    console.log('Live at Port ', port);
});