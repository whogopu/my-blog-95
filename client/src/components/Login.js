import React, { Component } from "react";
import { connect } from "react-redux";
import { authAction } from '../actions';
import qs from "qs";
import isEmpty from "lodash/isEmpty";
import jwt from "jsonwebtoken";

class Login extends Component {

	constructor(props){
		super(props)
		this.state = {
			redirectTo: null
		}
	}

	componentDidMount(){
		let queryString = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
		});

		if(!isEmpty(queryString)){
			let redirectTo = queryString.redirect;
			this.setState({redirectTo})
		}
	}

	login = () => {
		let { redirectTo } = this.state;
		let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3IiOnsiZW1haWwiOiJnb3BhbEBzby5jaXR5IiwidXNlcm5hbWUiOiJnb3BhbC0zOTZFblI3QlgiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy15Q0tld2VhN2p5dy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JkYUJjUHcxQTQyOHQ0Ml81dHYteTEzNjhKalF3L21vL3Bob3RvLmpwZyIsIm5hbWUiOiJHb3BhbCBTaGFybWEifSwiaWF0IjoxNTU4MTE0OTc2fQ.yr9nx_SaE_fTyExQY0tn9VqhQCt2kHXFbGQa0IH1TLg";
		localStorage.setItem('token', token);
		let decoded = jwt.decode(token);
		if(decoded){
			this.props.userLoggedIn(decoded.author)
			this.props.history.replace({ pathname: redirectTo ? redirectTo : '/' });
		}
	}

	render() {
		return (
			<button type="button" className="btn btn-outline-primary" onClick={this.login}>Login</button>
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
