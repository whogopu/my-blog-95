import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
	<header className="navbar navbar-expand-lg fixed-top navbar-light bg-light ">
		<div className="container">
			<NavLink to="/" className="navbar-brand">
				My Blog
			</NavLink>

			<div className="collapse navbar-collapse">
				<ul className="navbar-nav ml-auto">
					<li className="nav-item mr-3">
						<NavLink
							to="/add"
						>
							<button type="button" className="btn btn-outline-primary">New Post</button>
						</NavLink>

					</li>
					<li className="nav-item">
						<NavLink
							to="/add"
						>
							<button type="button" className="btn btn-outline-primary">Login</button>
						</NavLink>

					</li>
				</ul>
			</div>
		</div>
	</header>
);

export default Header;
