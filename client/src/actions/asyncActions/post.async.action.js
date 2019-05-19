import { postAction } from "..";

import {
	FETCH_ALL_POSTS_API,
	FETCH_SINGLE_POST_API,
	CREATE_POST_API,
	UPDATE_POST_API
} from "../../constants/api";

import axios from "axios";

export const asyncFetchAllPosts = (skip=0, limit=10) => dispatch => {
  return new Promise(async (resolve, reject) => {
		dispatch(postAction.fetchAllPosts());
		try {
			const res = await axios.get(FETCH_ALL_POSTS_API(skip, limit));

			if (res.status === 200 && res.data && res.data.success) {
				dispatch(postAction.fetchAllPostsSuccess(res.data.data));
				resolve(res.data.data)
			} else {
				const errMsg = res.data
					? res.data.data.message
					: "Error while fetching the posts";
				dispatch(postAction.fetchAllPostsError({ errMsg }));
				reject(errMsg)
			}
		} catch (err) {
			console.log("err", JSON.stringify(err));
			const errMsg = err.response
				? err.response.data.data.message
				: "Error while fetching the posts";
			dispatch(postAction.fetchAllPostsError({ errMsg }));
			reject(errMsg)
		}
	})
};

export const asyncFetchSinglePost = id => dispatch => {
	return new Promise(async (resolve, reject) => {
		dispatch(postAction.fetchSinglePost());
		try {
			const res = await axios.get(FETCH_SINGLE_POST_API(id));

			if (res.status === 200 && res.data && res.data.success) {
				dispatch(postAction.fetchSinglePostSuccess(res.data.data));
				resolve(res.data.data)
			} else {
				const errMsg = res.data
					? res.data.data.message
					: "Error while fetching the post";
				dispatch(postAction.fetchSinglePostError({ errMsg }));
				reject(errMsg)
			}
		} catch (err) {
			console.log("err", JSON.stringify(err));
			const errMsg = err.response
				? err.response.data.data.message
				: "Error while fetching the post";
			dispatch(postAction.fetchSinglePostError({ errMsg }));
			reject(errMsg)
		}
	})
}

export const asyncCreatePost = data => dispatch => {
	return new Promise(async (resolve, reject) => {
		dispatch(postAction.createPost());
		try {
			const res = await axios.post(CREATE_POST_API(), data);

			if (res.status === 200 && res.data && res.data.success) {

				dispatch(postAction.createPostSuccess(res.data.data));
				resolve(res.data.data)
			} else {
				const errMsg = res.data
					? res.data.data.message
					: "Error while creating the post";
				dispatch(postAction.createPostError({ errMsg }));
				reject(errMsg)
			}
		} catch (err) {
			console.log("err", JSON.stringify(err));
			const errMsg = err.response
				? err.response.data.data.message
				: "Error while creating the post";
			dispatch(postAction.createPostError({ errMsg }));
			reject(errMsg)
		}
	})
}

export const asyncUpdatePost = (id, data) => dispatch => {
	return new Promise(async (resolve, reject) => {
		dispatch(postAction.updatePost());
		try {
			const res = await axios.put(UPDATE_POST_API(id), data);

			if (res.status === 200 && res.data && res.data.success) {

				dispatch(postAction.updatePostSuccess(res.data.data));
				resolve(res.data.data)
			} else {
				const errMsg = res.data
					? res.data.data.message
					: "Error while updating the post";
				dispatch(postAction.updatePostError({ errMsg }));
				reject(errMsg)
			}
		} catch (err) {
			console.log("err", JSON.stringify(err));
			const errMsg = err.response
				? err.response.data.data.message
				: "Error while updating the post";
			dispatch(postAction.updatePostError({ errMsg }));
			reject(errMsg)
		}
	})
}