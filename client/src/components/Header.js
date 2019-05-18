import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import LoginModal from './LoginModal';
import jwt from "jsonwebtoken";

class Header extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			showLoginModal: false
		}
	}

	goToNewPost = () => {
		let token = localStorage.getItem("token");
		let decoded = jwt.decode(token);

		if(decoded) {
			if (this.props.location.pathname !== '/add')
				this.props.history.push({ pathname: '/add' });
		}	else {
			this.setState({showLoginModal: true})
		}

	}

	render() {
		return (
			<header className="navbar navbar-expand-lg fixed-top navbar-light bg-light ">
				<div className="container">
					<NavLink to="/" className="navbar-brand">
						My Blog
					</NavLink>

					<div className="collapse navbar-collapse">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item mr-3">
								<button type="button" className="btn btn-outline-primary" onClick={this.goToNewPost}>New Post</button>
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
				<LoginModal visible={this.state.showLoginModal} hideModal={()=> this.setState({showLoginModal: false})} />
			</header>
		);
	}
}

export default withRouter(Header);
