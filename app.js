// importing dependencies
var express = require('express');
var app= express();
var bodyParser= require('body-parser');
//command to use body parser...and command to automatically rendering pages as ejs
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

var sites=[
{title:'NSP', image:'https://media.timeout.com/images/103391491/630/472/image.jpg',description:'abc'},
{title:'satya niketan' ,image:'https://media.cntraveler.com/photos/5a904ebba566be4ab1b46817/4:3/w_420,c_limit/Bird-of-a-feather_2018_4351517903784_.pic_hd.jpg',description:'abc'},
{title:'Dwarka', image:'https://cdn.shopify.com/s/files/1/1096/9584/articles/Cafe_Ventoux_2048x2048.jpg?v=1509613894',description:'abc'},
{title:'shoe market', image:'https://www.broadsheet.com.au/media/cache/df/79/df79547e5c842e09b8c2456b2034f742.jpg',description:'abc'},
{title:'Hudson lane' ,image:'https://www.goodfood.com.au/content/dam/images/h/1/3/4/1/1/image.related.wideLandscape.940x529.h133zh.png/1532480002281.jpg',description:'abc'}
];

//Routes
 app.get('/',function(req,res){
 	res.render('home');
 });
 
 app.get('/sites',function(req,res){
 	res.render('sites',{sites:sites});	//{<ejs page variable>:<current page variable>}
 });

 app.post('/addsite',function(req,res){
 	var titleA= req.body.title;
 	var imageA= req.body.image;
 	var descriptionA=req.body.description;
 	var add={
 				title:titleA,
 				image:imageA,
 				description:descriptionA
 			};
 	sites.push(add);
 	res.redirect('sites');
 });

 //listening port
  app.listen(3000,function(){
  	console.log("serving port 3000");
  });