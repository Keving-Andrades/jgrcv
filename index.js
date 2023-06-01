require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const reviewRouter = require('./routes/reviewRouter');
const path = require("path");

const app = express();

// SETTINGS
const PORT = process.env.PORT || 8080;

// MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));

// CONNECT TO MONGODB
const URI = process.env.DATABASE;

const connectMongo = async () => {
	try {
		await mongoose.connect(URI);
		console.log("Connected to database.");
	} catch (err) {
		console.error(err);
	};
};

connectMongo();

mongoose.connection.on('error', err => {
	console.error(err.message);
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static("client/dist"));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
	});
};

//ROUTES
app.use('/api', reviewRouter);

//STARTING SERVER
app.listen(PORT, () => {
    console.log(`Server at port ${PORT}`);
});