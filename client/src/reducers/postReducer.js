import update from "immutability-helper";
import {findIndex} from 'lodash';

import {
	FETCH_ALL_POSTS_SUCCESS,
	FETCH_SINGLE_POST_SUCCESS,
	CREATE_POST_SUCCESS,
	UPDATE_POST_SUCCESS,
	DELETE_POST_SUCCESS,
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

const createPostSuccess = (state, action) =>{
	return update(state, {
    post: {
      $set: action.payload.post
		},
		posts: {
			$unshift: [action.payload.post]
		}
  });
}

const updatePostSuccess = (state, action) =>{
	let index = findIndex(state.posts, post => post._id === state.post._id);

	let updateObj = {
		post: {
      $set: action.payload.post
		}
	}

	if(index !== -1){
		updateObj['posts'] = {
			[index]: action.payload.post
		}
	}
	return update(state, updateObj);
}

const deletePostSuccess = (state, action) => {
	let index = findIndex(state.posts, post => post._id === action.payload.id );

	let updateObj = {
		post: {
			$set: {}
		}
	}

	if ( index !== -1 ) {
		updateObj['posts'] = {
			$splice: [[index, 1]]
		}
	}

	return update(state, updateObj);
}

export const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ALL_POSTS_SUCCESS: return fetchAllFeedSuccess(state, action)
		case FETCH_SINGLE_POST_SUCCESS: return fetchSingleFeedSuccess(state, action)
		case CREATE_POST_SUCCESS: return createPostSuccess(state, action)
		case UPDATE_POST_SUCCESS: return updatePostSuccess(state, action)
		case DELETE_POST_SUCCESS: return deletePostSuccess(state, action)
		default: return state;
	}
}
