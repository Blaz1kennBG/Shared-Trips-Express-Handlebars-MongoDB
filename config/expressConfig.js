const express = require('express'),
 hbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const auth = require('../middlewares/auth')
module.exports =  (app) => {
     app.engine(
		'hbs',
		hbs({
			extname: '.hbs',
		})
	); 
	

	app.set('view engine', 'hbs');
    app.use(express.static('static'));
	app.use(express.static('scripts')) 
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser())
	
	

	
}