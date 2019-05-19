import {
	USER_LOGIN,
	USER_LOGOUT
} from "../constants";

const initialState = {
	user: {}
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN:
			return {
				user: action.payload.user
			};
		case USER_LOGOUT:
			return initialState;
		default:
			return state;
	}
}
