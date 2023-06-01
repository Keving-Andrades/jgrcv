const Review = require("../models/reviewModel");
const axios = require("axios").default;

const reviewCtrl = {
	getReviews: async (req, res) => {
		try {
			const reviews = await Review.find();

			if (reviews.length < 1) return res.status(400).json({
				status: 400,
				success: false,
				content: "No reviews available."
			});

			return res.json({
				status: 200,
				success: true,
				content: reviews
			});
		} catch (err) {
			const { message } = err;

			return res.status(500).json({
				status: 500,
				success: false,
				content: message
			});
		};
	},
	createReview: async (req, res) => {
		try {
			const { body: { name, review }, socket: { remoteAddress: ip } } = req;

			const { status, country, regionName } = await axios.get(`http://ip-api.com/json/${ip}?fields=status,country,regionName&lang=es`);

			if (status !== "success") return res.status(400).json({
				status: 400,
				success: false,
				content: "Could not find address."
		 	});

			const newReview = new Review({
				name,
				location: `${regionName}, ${country}`,
				review
			});
			
			await newReview.save();

			return res.json({
				status: 200,
				success: true,
				content: "Review submitted successfully."
			});
		} catch (err) {
			const { message } = err;

			return res.status(500).json({
				status: 500,
				success: false,
				content: message
			});
		};
	}
};

module.exports = reviewCtrl;