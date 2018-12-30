const express = require('express');

const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./server/models/User');
require('./server/models/Survey');
require('./server/services/passport');

mongoose.connect(keys.mongoURI, function(){
	console.log('Connect to MongoDB Successfuly');
});

const app = express();

app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./server/routes/authRoutes')(app);
require('./server/routes/billingRoutes')(app);
require('./server/routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	// express will serve up prod assets. main.js main.css etc
	app.use(express.static('client/build'));

	// express will serve up the index.html file if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
	console.log('Running in localhost:5000');
});
