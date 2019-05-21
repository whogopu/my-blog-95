import {
	USER_LOGIN,
	USER_LOGOUT,
	SIGN_IN_SUCCESS,
	SIGN_IN_ERROR
} from "../../constants";

const userLoggedIn = (user) => ({ type: USER_LOGIN, payload: { user }});

const userLoggedOut = () => ({type: USER_LOGOUT});

const signInSuccess = data => ({
  type: SIGN_IN_SUCCESS,
  payload: {
    token: data.token
  }
});

const signInError = errMsg => ({
  type: SIGN_IN_ERROR,
  payload: { msg: errMsg }
});

export default {
	userLoggedIn,
	userLoggedOut,
	signInSuccess,
	signInError
};
