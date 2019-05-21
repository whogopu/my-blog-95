import { authAction } from "..";

import {
	SIGNIN_API
} from "../../constants/api";

import axios from "axios";

export const asyncLogin = (accessToken) => dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.post(SIGNIN_API(), accessToken);

			if (res.status === 200 && res.data && res.data.success) {

				dispatch(authAction.signInSuccess(res.data.data));
				resolve(res.data.data)
			} else {
				const errMsg = res.data
					? res.data.data.message
					: "Error while signin in the user";
				dispatch(authAction.signInError({ errMsg }));
				reject(errMsg)
			}
		} catch (err) {
			console.log("err", JSON.stringify(err));
			const errMsg = err.response
				? err.response.data.data.message
				: "Error while signin in the user";
			dispatch(authAction.signInError({ errMsg }));
			reject(errMsg)
		}
	})
}