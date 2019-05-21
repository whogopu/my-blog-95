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
				<div className="container mt-5">
          <div className="row justify-content-md-center">

            <div className="col-sm-4 " style={{backgroundColor: "#6fc2d0"}}>
              <img src="graphic2.svg" alt="Login" />
            </div>
            <div className="col-sm-4" style={{backgroundColor:"#4592af"}}>
              <div style={{ textAlign: "center", paddingTop: "120px" }}>
                <p className="text-white font-weight-bold">Sign in to get personalized blogs.</p>
                <button
                  className="btn btn-light"
                  onClick={() => this.Firebase("google")}
                >
                  <img
                    width="20px"
                    style={{
                      marginRight: "10px"
                    }}
                    alt="Google &quot;G&quot; Logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  />
                  Log in with Google
                </button>
              </div>
            </div>
          </div>
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
