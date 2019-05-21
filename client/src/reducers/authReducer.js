import jwt from "jsonwebtoken";
import update from "immutability-helper";

import {
	USER_LOGIN,
	USER_LOGOUT,
	SIGN_IN_SUCCESS,
	SIGN_IN_ERROR
} from "../constants";

const initialState = {
	user: {}
};

const userLogin = (state, action) => {
	return update(state, {
		user: {
			$set: action.payload.user
		}
	})
}

const signInSuccess = (state, action) =>{
	let token = action.payload.token;
	localStorage.setItem('token', token);
	let decoded = jwt.decode(token);
	if(decoded){
		return update(state, {
			user: {
				$set: decoded.author
			}
		});
	} else {
		return state;
	}
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN: return userLogin(state, action)
		case USER_LOGOUT: return initialState;
		case SIGN_IN_SUCCESS: return signInSuccess(state, action)
		case SIGN_IN_ERROR: return initialState
		default: return state;
	}
}
