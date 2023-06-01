import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
	const [ reviews, setReviews ] = useState([]);

	const getReviews = async () => {
		const { data: { status, success, content } } = await axios.get("/api/reviews");
		
		if (success) setReviews([...reviews, ...content]);
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