let createError = require('http-errors');
let  express = require('express');
let  path = require('path');
let cookieParser = require('cookie-parser');
let multer = require("multer");


// modules for authentication
let session = require('express-session');



let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//database setup
let mongoose = require('mongoose');
let DB = require('./db');

//point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

//to check if mongoose is working 
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

//routers set up

let  indexRouter = require('../routes/index');
let orderRouter = require('../routes/order');

let  app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');


//photo 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });


app.post("/uploadPhoto", upload.single("myImage"), (req, res) => {
    const obj = {
        img: {
            data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
            contentType: "image/png"
        }
    }
    const newImage = new ImageModel({
        image: obj.img
    });
    newImage.save((err) => {
        err ? console.log(err) : res.redirect("/");
    });
});




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());



// add images 

app.use('/public', express.static('./public'));

// routing

app.use('/', indexRouter);
app.use('/order-list', orderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: 'Error'});
});

  
module.exports = app;

