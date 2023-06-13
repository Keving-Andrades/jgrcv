import React, { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import { ReactComponent as Icon } from '../../assets/utils/icon.svg';

const Header = ({ headerHandler }) => {
	const ref = useRef(null);
	const headerIsInView = useInView(ref, { amount: .9, margin: "60% 0px 0px 0px" });
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
	const [ color, setColor ] = headerHandler;

	useEffect(() => {
		setColor(color => 
			headerIsInView ?
				{
					backgroundColor: "transparent",
					color: "var(--white)",
					activeColor: "var(--primary-color)"
				}
			:
				{
					backgroundColor: "var(--white)",
					color: "var(--secondary-color)",
					activeColor: "var(--primary-color)"
				}
		);
	}, [ headerIsInView ]);

	const navigate = useNavigate();
	const { pathname: path } = useLocation();

	const pathname = path === "/" ? "home" : path.replace("/", "");

	return (
		<header onContextMenu={e => e.preventDefault()} ref = { ref }>
			<div className='header__top' style={{ color: `${color.color}`,backgroundColor: `${color.backgroundColor}` }}>
				<div className="logo">
					<Icon style = {{ color: color.activeColor }}/>
					<span>Conexión Viajera</span>
				</div>
				<nav>
					{
						pages.map(({ label, path, name }) => 
							<div
								key = { label }
								onClick = { () => navigate(path) }
							>
								<span
									className = { `${label === pathname ? "active": ""}` }
									style={{ color: label === pathname ? color.activeColor : color.color }}
								>
									{ name }
									{
										label === pathname ? 
											<m.div
												layoutId='underline' 
												className="underline"
												style={{ backgroundColor: label === pathname ? color.activeColor : color.color }}
											>
											</m.div>
										:
											null
									}
								</span>
							</div>
						)
					}
				</nav>
			</div>
			<span className="slogan">
				Turismo
				<span className='green'>Ecológico</span>
			</span>
		</header>
	);
};

export default Header;