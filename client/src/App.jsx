import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, useLocation, useOutlet } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Home from './components/mainpages/home/Home';
import NotFound from './components/mainpages/utils/not_found/NotFound';
import Header from './components/header/Header';
import About from './components/mainpages/about/About';
import Sites from './components/mainpages/sites/Sites';
import Reviews from './components/mainpages/reviews/Reviews';

const Outlet = () => {
	const [ outlet ] = useState(useOutlet());

	return (
		<>
			{ outlet }
		</>
	);
};

const AppLayout = () => {
	const location = useLocation();
	const { pathname } = location;
	const page = pathname === "/" ? "home" : pathname.replace("/", "");

	return (
		<DataProvider>
			<Header />
			<main className={page}>
				<Outlet key={location.pathname} />
			</main>
		</DataProvider>
	);
};

const router = createBrowserRouter([
	{
		element: (<AppLayout />),
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: '/about',
				element: <About />
			},
			{
				path: '/sites',
				element: <Sites />
			},
			{
				path: '/reviews',
				element: <Reviews />
			},
			{
				path: '*',
				element: <NotFound />
			}
		]
	}
]);

function App() {
	return <RouterProvider router={router} />;
};

export default App;