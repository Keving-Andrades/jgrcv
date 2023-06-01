require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const reviewRouter = require('./routes/reviewRouter');

const app = express();

// SETTINGS
const PORT = process.env.PORT || 8080;

// MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));

// CONNECT TO MONGODB
const URI = process.env.DATABASE;

mongoose.connect(URI);
mongoose.connection.on('error', err => {
	console.error(err.message);
});

//ROUTES
app.use('/api', reviewRouter);

//STARTING SERVER
app.listen(PORT, () => {
    console.log(`Server at port ${PORT}`);
});