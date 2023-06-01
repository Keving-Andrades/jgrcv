import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
	const pages = [
		{
			label: "home",
			path: "/",
			name: "Inicio"
		},
		{
			label: "about",
			path: "/about",
			name: "Acerca de"
		},
		{
			label: "sites",
			path: "/sites",
			name: "Sitios"
		},
		{
			label: "reviews",
			path: "/reviews",
			name: "Reseñas"
		}
	];

	const navigate = useNavigate();
	const { pathname: path } = useLocation();

	const pathname = path === "/" ? "home" : path.replace("/", "");

	return (
		<header>
			<nav>
				{
					pages.map(({ label, path, name }) => 
						<div
							key = { label }
							onClick = { () => navigate(path) }
						>
							<span 
								className = { `${label === pathname ? "active": ""}` }
							>
								{ name }
							</span>
						</div>
					)
				}
			</nav>
		</header>
	);
};

export default Header;