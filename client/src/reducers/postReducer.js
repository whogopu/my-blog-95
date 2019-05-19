import update from "immutability-helper";

import {
	FETCH_ALL_POSTS,
	FETCH_ALL_POSTS_SUCCESS,
	FETCH_ALL_POSTS_ERROR,
	FETCH_SINGLE_POST,
	FETCH_SINGLE_POST_SUCCESS,
	FETCH_SINGLE_POST_ERROR
} from "../constants";

const initialState = {
	post: {},
	posts: []
};

const fetchAllFeedSuccess = (state, action) =>{
	return update(state, {
    posts: {
      $set: action.payload.posts
    }
  });
}

const fetchSingleFeedSuccess = (state, action) =>{
	return update(state, {
    post: {
      $set: action.payload.post
    }
  });
}

export const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ALL_POSTS_SUCCESS: return fetchAllFeedSuccess(state, action)
		case FETCH_SINGLE_POST_SUCCESS: return fetchSingleFeedSuccess(state, action)
		case "CHANGE_SELECTED_POST":
			return {
				post: action.post,
				posts: state.posts
			};
		case "UPDATE_POST":
			return {
				post: { ...state.post, ...action.post },
				posts: state.posts.map((post) => {
					if (post._id === action._id) return { ...post, ...action.post };
					else return post;
				})
			};
		case "DELETE_POST":
			return {
				post: {},
				posts: state.posts.filter((post) => post._id !== action._id)
			};
		default:
			return state;
	}
}
