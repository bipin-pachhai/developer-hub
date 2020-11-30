require("dotenv").config();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var routes = require("./routes/routes");
var cors = require('cors');

var app = express();
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(cors());

// defining the error handler middleware
function errorHandler(err, req, res, next){
	if(err){
    res.json(err);

	}
 }

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(routes);
app.use(errorHandler);
const port = process.env.PORT || 3001;
app.listen( port, () => {
  console.log(`app is running at ${port}`);
});

