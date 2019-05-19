import {
	USER_LOGIN,
	USER_LOGOUT
} from "../../constants";

const userLoggedIn = (user) => ({ type: USER_LOGIN, payload: { user }});
const userLoggedOut = () => ({type: USER_LOGOUT});

export default {
	userLoggedIn,
	userLoggedOut
};
