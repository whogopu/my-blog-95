import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'
import { authAction } from '../actions';
import jwt from "jsonwebtoken";

class Login extends Component {

	state = { redirectToReferrer: false };

	login = (token) => {
		localStorage.setItem('token', token);
		let decoded = jwt.decode(token);
		if(decoded){
			this.props.userLoggedIn(decoded.author)
			this.setState({ redirectToReferrer: true });
		}
	}

	login1 = () => {
		let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3IiOnsiZW1haWwiOiJnb3BhbEBzby5jaXR5IiwidXNlcm5hbWUiOiJnb3BhbC0zOTZFblI3QlgiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy15Q0tld2VhN2p5dy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JkYUJjUHcxQTQyOHQ0Ml81dHYteTEzNjhKalF3L21vL3Bob3RvLmpwZyIsIm5hbWUiOiJHb3BhbCBTaGFybWEifSwiaWF0IjoxNTU4MTE0OTc2fQ.yr9nx_SaE_fTyExQY0tn9VqhQCt2kHXFbGQa0IH1TLg";
		this.login(token)
	}

	login2 = () => {
		let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3IiOnsiZW1haWwiOiJnb3BhbEBzby5jaXR5IiwidXNlcm5hbWUiOiJnb3BhbC0zOTZFblI3QlgxIiwicGljdHVyZSI6Imh0dHBzOi8vbGg0Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8teUNLZXdlYTdqeXcvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUNIaTNyZGFCY1B3MUE0Mjh0NDJfNXR2LXkxMzY4SmpRdy9tby9waG90by5qcGciLCJuYW1lIjoiR29wYWwgU2hhcm1hMSJ9LCJpYXQiOjE1NTgxMTQ5NzZ9.TDDsdE4mPdBGXvWjwlm2xmnTsOkFTyVg1ctbH_q2-jA";
		this.login(token)
	}

	render() {

		let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

		if (redirectToReferrer) return <Redirect to={from} />;

		return (
			<div>
				<button type="button" className="btn btn-outline-primary" onClick={this.login1}>Login1</button>
				<button type="button" className="btn btn-outline-primary" onClick={this.login2}>Login2</button>
			</div>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		authUser: state.authReducer.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		userLoggedIn: (authUser) => dispatch(authAction.userLoggedIn(authUser))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
