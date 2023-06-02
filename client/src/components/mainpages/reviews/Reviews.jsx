import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';

const Reviews = () => {
	const state = useContext(GlobalState);
	const { reviewsAPI } = state;
	const [ reviews, setReviews ] = reviewsAPI.reviews;
	const [ reviewData, setReviewData ] = useState({name: "", review: ""});
	const [ formStatus, setFormStatus ] = useState(null);

	const reviewSubmit = async e => {
		e.preventDefault();

		try {
			const { name, review } = reviewData;
			const { data: { status, success, content } } = await axios.post("/api/reviews", {name: name.trim(), review: review.trim()});

			return setReviews([...reviews, content]);
		} catch (err) {
			const { response: { data: { status, success, content } } } = err;
			if (!success) return setFormStatus({
				status,
				success,
				content
			});
		};
	};

	const onChangeInput = e => {
		const { name, value } = e.target;
		setReviewData({...reviewData, [name]: value});
	};

	return (
		<>
			<div className='list'>
				{
					reviews.length > 0 ?
						reviews.map(({ name, location, review }, ind) =>
							<div className="review" key={ind}>
								<div className="review__userData">
									<span> { name } </span>
									<span> { location } </span>
								</div>
								<span className='review__content'> { review } </span>
							</div>
						)
					:
						<div className="empty">No hay reseñas aun :(</div>
				}
			</div>
			<div className="form">
				<h2>¡Escribe tu <span className='green'>reseña</span> aquí!</h2>
				<form onSubmit={reviewSubmit} autoComplete="off">
					<div>
						<label htmlFor="name">Nombre</label>
						<input 
							type = 'text'
							name = 'name'
							id = 'name'
							placeholder = 'Escribe tu nombre aquí'
							value = { reviewData.name }
							maxLength = { 20 }
							required
							onChange = { onChangeInput }
						/>
					</div>
					<div>
						<label htmlFor="review">Reseña</label>
						<textarea
							name = 'review'
							id = 'review'
							placeholder='Escribe tu reseña aquí'
							value = { reviewData.content }
							maxLength = { 295 }
							required
							onChange = { onChangeInput }
						/>
					</div>
					{
						formStatus && !formStatus.success ?
							<span className="error">Ha ocurrido un error, inténtalo de nuevo más tarde.</span>
						:
							null
					}
					<button type='submit'>Enviar</button>
				</form>
			</div>
		</>
	);
};

export default Reviews;