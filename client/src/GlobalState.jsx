import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
	const [ reviews, setReviews ] = useState([]);

	const getReviews = async () => {
		try {
			const res = await axios.get("/api/reviews");
			const { data: { status, success, content } } = res
			
			if (success) setReviews([...reviews, ...content]);
		} catch (err) {
			const { message } = err;

			console.log(message);
		};
	};

	useEffect(() => {
		getReviews();
	}, []);

	const state = {
		reviews: [ reviews, setReviews ]
	};

	return (
		<GlobalState.Provider value={state}>
			{ children }
		</GlobalState.Provider>
	);
};