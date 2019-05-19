import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import { connect } from "react-redux";
import { authAction } from '../actions';
import setAuthToken from "../config/setAuthToken";

class Header extends React.Component {

	componentDidMount(){
		let token = localStorage.getItem("token");
		let decoded = jwt.decode(token);
		if(decoded){
			setAuthToken(token);
			this.props.userLoggedIn(decoded.author)
		}
	}

	logout = () => {
		localStorage.removeItem('token')
		this.props.history.replace({ pathname: '/' });
		this.props.userLoggedOut()
	}

	render() {
		return (
			<header className="navbar navbar-expand-lg fixed-top navbar-light" style={{"backgroundColor": "#4592af"}}>
				<div className="container">
					<NavLink to="/" className="navbar-brand text-white font-weight-bold">
						My Blog
					</NavLink>

					<div className="collapse navbar-collapse">
						<ul className="navbar-nav ml-auto">
							{this.props.authUser.username && (<li className="nav-item mr-3 text-white" ><p style={{"lineHeight": "6px", "margin": "16px 0"}}>{ this.props.authUser.name}</p></li>)}
							<li className="nav-item mr-3">
								<NavLink to="/add">
									<button type="button" className="btn btn-outline-light" >New Post</button>
								</NavLink>
							</li>
							{this.props.authUser.username
							? (
								<li className="nav-item">
									<button type="button" className="btn btn-outline-light" onClick={this.logout}>Logout</button>
								</li>
							)
							: (
								<li className="nav-item">
									<NavLink to="/login">
										<button type="button" className="btn btn-outline-light">Login</button>
									</NavLink>
								</li>
							)
							 }
						</ul>
					</div>
				</div>
			</header>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authUser: state.authReducer.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		userLoggedIn: (authUser) => dispatch(authAction.userLoggedIn(authUser)),
		userLoggedOut: () => dispatch(authAction.userLoggedOut())
	};
};

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Header));
