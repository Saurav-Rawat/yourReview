// importing dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var _ = require("lodash");

//mongoDB initialise
mongoose
	.connect('mongodb://localhost/dummie', { useNewUrlParser: true })
	.then(() => {
		console.log("MongoDB connected.");
	})
	.catch(err => {
		console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
		// process.exit();
	});

//command to use body parser...and command to automatically rendering pages as ejs
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// var sites=[
// {title:'NSP', image:'https://media.timeout.com/images/103391491/630/472/image.jpg',description:'abc'},
// {title:'satya niketan' ,image:'https://media.cntraveler.com/photos/5a904ebba566be4ab1b46817/4:3/w_420,c_limit/Bird-of-a-feather_2018_4351517903784_.pic_hd.jpg',description:'abc'},
// {title:'Dwarka', image:'https://cdn.shopify.com/s/files/1/1096/9584/articles/Cafe_Ventoux_2048x2048.jpg?v=1509613894',description:'abc'},
// {title:'shoe market', image:'https://www.broadsheet.com.au/media/cache/df/79/df79547e5c842e09b8c2456b2034f742.jpg',description:'abc'},
// {title:'Hudson lane' ,image:'https://www.goodfood.com.au/content/dam/images/h/1/3/4/1/1/image.related.wideLandscape.940x529.h133zh.png/1532480002281.jpg',description:'abc'}
// ];

//Schema
const schema = new mongoose.Schema({
	title: { type: String, required: [true, "Title is required"] },
	imageLoc: { type: String, default: 'https://cdn.samsung.com/etc/designs/smg/global/imgs/support/cont/NO_IMG_600x600.png' },
	description: { type: String, required: [true, "description is required"], }
});
const siteSchema = mongoose.model("sites", schema);



//Routes
app.get('/', function (req, res) {
	res.render('home');
});

app.get('/sites', function (req, res) {
	siteSchema.find().lean().exec((err, sites) => {
		if (err) {
			console.error(err)
			res.send('Woops an error occured while finding');
		}
		res.render('sites', { sites: sites });	//{<ejs page variable>:<current page variable>}
	})
});

app.get('/sites/:id',function(req,res){

		res.send("this will be show page");
});

app.get('/upload',function(req,res){
	res.render('upload');
});

app.post('/addsite', function (req, res) {
	let Site = new siteSchema()
	_.each(req.body, (value, key) => {
		Site[key] = value
	})
	Site.save((err, doc) => {
		if (err) {
			console.error(err)
			res.send('error saving')
		} else {
			console.log('done saving', doc)
			res.redirect('sites');
		}
	})
});

//listening port
app.listen(3000, function () {
	console.log("serving port 3000");
});