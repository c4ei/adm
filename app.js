var express = require('express');
global.app = express(); 
global.moment = require('moment');
const expressValidator = require('express-validator');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

// Required module 
app.use(expressValidator());
app.use(cors()); 
app.use(fileUpload()); 

global.connectPool = require('./config/db.js');    
 
global.Mails = require('./controllers/MailsController');   // Mail function  
global.Common = require('./controllers/CommonsController');   // Common function  
global.Auth = require('./controllers/AuthController');   // Mail function   
// Constants 
//global.nodeSiteUrl = 'http://192.168.1.151/constructionApp/nodeApi/'; // node  
global.nodeSiteUrl = process.env.SiteUrl; // node  
global.nodeAdminUrl = process.env.SiteUrl+'/api/admin'; // node  
  
global.siteUrl = process.env.SrvUrl+'/constructionApp/code/api/'; // laravel
global.WebsiteURL = process.env.SrvUrl+'/constructionApp/code/';  // laravel      
global.fromEmail = 'info@construction-app.com'; // laravel     
global.SITE_NAME = 'ConstructionApp'; // laravel    
global.noImageUsers = process.env.SrvUrl+'/constructionApp/code/public/upload/avtar.png';  
global.noImageConstructor = process.env.SrvUrl+'/constructionApp/code/public/upload/No_Image_Available.png';   
global.noImageConstructor = process.env.SrvUrl+'/constructionApp/code/public/upload/No_Image_Available.png';   
global.noImageProduct = process.env.SiteUrl+'/images/No_Image_Available.png';   
global.pageLimit = 10;   
global.successStatus = 200;
global.failStatus = 401; 
global.SessionExpireStatus = 500; 
global.CustomerRole = 1;  
global.ConstructorRole = 2;  
global.SITE_URL = process.env.SrvUrl+'/constructionApp/code/';  
global.CURRENCY = '$';  
global.FIREBASE_LEGACY_KEY = process.env.FIREBASE_LEGACY_KEY;  
global.LOCATION_RANGE = 50; 

// Notification type 
global.PROJECT_NOTIFICATION_TYPE = 1; 
global.MILESTONE_UPDATE_NOTIFICATION_TYPE = 2; 
global.MILESTONE_PAYMENT_NOTIFICATION_TYPE = 3;  
global.REVIEW_NOTIFICATION_TYPE = 4;  
global.siteTitle = 'cApp Admin';  
 

/* Admin section code */
app.set('view engine', 'ejs');
//app.set('view engine', 'pug') 
var path = require('path');
app.set('views', path.join(__dirname, 'views'));  
app.use(express.static(__dirname +'/public'));  
var flash = require('express-flash-messages')
app.use(flash())
 
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
app.use(cookieParser()); 
app.use(expressSession({secret: process.env.Session_secret, resave: false,saveUninitialized: true}));  
// app.use(expressSession({ cookie: { maxAge: 60000 }, 
//     secret: 'woot',
//     resave: false, 
//     saveUninitialized: false}));
 
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});   
app.use(bodyParser.json());  
app.use(express.urlencoded({limit: '100mb',extended: true })); 

const nodemailer    = require("nodemailer"); 
global.smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PWD
    }
}); 
 
var apiRouter = require('./routes/api');
app.use('/api', apiRouter); 
var server = app.listen(process.env.PORT, function () { 
    console.log("Example app listening at "+process.env.SrvUrl+":%s", server.address().port);
});   
// var apiRouter = require('./routes/admin');
// app.use('/', adminRouter); 
// var server = app.listen(8081, function () {
//     console.log("Example app listening at http://localhost:%s", server.address().port);
// });    
process.on('uncaughtException', function (err) { 
    console.log('Caught exception: ' + err);
});  

// Check session of logged user 
global.CheckPermission = function(req, res){  
    if(typeof req.session.user !== "undefined"){
        LoginUser = req.session.LoginUser; 
        if(LoginUser){
            return true; 
        }else{ 
            res.redirect(nodeAdminUrl+'/login'); 
        }
    }else{
        return true; 
    } 
    return true;  
}; 

