import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'
import { authAction, asyncLogin } from '../actions';
import firebase from "firebase";
import { auth, googleProvider } from "../utils/firebase";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from 'react-toastify';

class Login extends Component {

	state = { redirectToReferrer: false };

	componentDidMount(){
		this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      let token = localStorage.getItem("token");
      let decoded = jwt.decode(token);
      let isTokenValid = token && decoded ;

       if (!user && isTokenValid) {
        localStorage.removeItem('token')
        firebase.auth().signOut();
        this.props.history.replace({ pathname: '/' });
        this.props.userLoggedOut()
      }
    });
  }

  notifyInfo = (msg) => toast.info(msg);
	notifyErr = (msg) => toast.error(msg);

	componentWillUnmount() {
    this.unregisterAuthObserver();
	}

	googleLogin = responseData => {
    if (responseData) {
      let accessToken = responseData.credential.accessToken;
      this.props.asyncLogin({ accessToken })
      .then(response => {
        this.setState({ redirectToReferrer: true });
      })
      .catch(err => {
        this.notifyErr(err)
      })
    }
  };

	Firebase = mode => {
    let provider;
    if (mode === "google") {
      provider = googleProvider;
    }
    auth()
      .signInWithPopup(provider)
      .then(result => {
        if (mode === "google") {
          this.googleLogin(result); //state
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

	render() {

		let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

		if (redirectToReferrer) return <Redirect to={from} />;

		return (
			<div>
				<div style={{ textAlign: "center" }}>
                <button
                  className="btn btn-solid-info"
                  onClick={() => this.Firebase("google")}
                >
                  Login With Google
                </button>
              </div>
				<ToastContainer draggable={false} position={toast.POSITION.BOTTOM_RIGHT} />

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
		userLoggedIn: (authUser) => dispatch(authAction.userLoggedIn(authUser)),
		asyncLogin: (accessToken) => dispatch(asyncLogin(accessToken)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
