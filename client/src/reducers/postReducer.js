import update from "immutability-helper";
import {findIndex} from 'lodash';

import {
	FETCH_ALL_POSTS,
	FETCH_ALL_POSTS_SUCCESS,
	FETCH_ALL_POSTS_ERROR,
	FETCH_SINGLE_POST,
	FETCH_SINGLE_POST_SUCCESS,
	FETCH_SINGLE_POST_ERROR,
	CREATE_POST,
	CREATE_POST_SUCCESS,
	CREATE_POST_ERROR,
	UPDATE_POST,
	UPDATE_POST_SUCCESS,
	UPDATE_POST_ERROR,
	DELETE_POST,
	DELETE_POST_SUCCESS,
	DELETE_POST_ERROR
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
