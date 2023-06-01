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

			if (!name) return res.status(400).json({
				status: 400,
				success: false,
				content: "Name value required."
			});

			if (name.length > 20) return res.status(400).json({
				status: 400,
				success: false,
				content: "Name length must be less than or equal to 20."
			});

			if (!review) return res.status(400).json({
				status: 400,
				success: false,
				content: "Review value required."
			});
			
			if (review.length > 295) return res.status(400).json({
				status: 400,
				success: false,
				content: "Review length must be less than or equal to 295."
			});

			const { status, country, regionName } = await axios.get(`http://ip-api.com/json/${ip}?fields=status,country,regionName&lang=es`);

			if (status !== "success") return res.status(400).json({
				status: 400,
				success: false,
				content: "Could not find address."
		 	});

			const reviewData = {
				name,
				location: `${regionName}, ${country}`,
				review
			};

			const newReview = new Review({ ...reviewData });
			
			await newReview.save();

			return res.json({
				status: 200,
				success: true,
				content: reviewData
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