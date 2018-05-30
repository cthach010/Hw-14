// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// var path = require("path");

// // Requiring Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// // Scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Require all models
// var db = require("./models");

//Define port
var port = process.env.PORT || 3000;

// Mongoose
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/nytimes");
var db = mongoose.connection;


// Show mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});


// log a success message
db.once("open", function() {
  console.log("Mongoose connection is successful.");
});


// Initialize Express
var app = express();

// // Use morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false}));
// app.use(bodyParser.json());
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main",
}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./routes/scrape.js");

app.use("/", routes);

// Listen on port
app.listen(port, function() {
  console.log("App running on port " + port);
});


// Routes
// app.get("/scrape", function(req, res) {
// // First, grab the body of the html with request
// 	request("http://www.nytimes.com", function(error, response, html) {
// // Second, load into cheerio and save it to $
//     var $ = cheerio.load(html);
// // Third, grab every h2 within an article tag, and do the following:
// 		$('h2.story-heading').each(function(i, element) {
// 			var result = {};
// 			result.title = $(this).children("a").text();
// 			result.link = $(this).children("a").attr("href");

// 			var entry = new Article(result);

// 			entry.save(function(err, doc) {
// 				if (err) {
// 					console.log(err);
// 				}
// 				else {
// 					console.log(doc);
// 				}
// 			});
// 		});
// 	});
// 	res.send("Scrape is complete");
// });

// // articles we scraped from the mongoDB
// app.get("/articles", function(req, res) {
//   // Grab every doc in the Articles array
//   Article.find({}, function(error, doc) {
//     // Log any errors
//     if (error) {
//       console.log(error);
//     }
//     // Or send the doc to the browser as a json object
//     else {
//       res.json(doc);
//     }
//   });
// });

// // Grab an article by it's ObjectId
// app.get("/articles/:id", function(req, res) {
//   // Grab id  and passed in the id parameter
//   Article.findOne({ "_id": req.params.id })
//   // populate 
//   .populate("note")
//   // now, execute our query
//   .exec(function(error, doc) {
//     // Log any errors
//     if (error) {
//       console.log(error);
//     }
//     else {
//       res.json(doc);
//     }
//   });
// });

// app.post("/articles/:id", function(req, res) {
// 	var newNote = new Note(req.body);
// 	newNote.save(function(error, doc) {
// 		if (err) {
// 			console.log(err);
// 		}
// 		else {
// 			res.send(doc);
// 		}
// 	});
// });


