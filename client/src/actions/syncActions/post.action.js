import {
	FETCH_ALL_POSTS_SUCCESS,
  FETCH_ALL_POSTS_ERROR,
  FETCH_SINGLE_POST_SUCCESS,
  FETCH_SINGLE_POST_ERROR,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR
} from "../../constants";

const fetchAllPostsSuccess = data => ({
  type: FETCH_ALL_POSTS_SUCCESS,
  payload: {
    posts: data.posts
  }
});

const fetchAllPostsError = errMsg => ({
  type: FETCH_ALL_POSTS_ERROR,
  payload: { msg: errMsg }
});

const fetchSinglePostSuccess = data => ({
  type: FETCH_SINGLE_POST_SUCCESS,
  payload: {
    post: data.post
  }
});

const fetchSinglePostError = errMsg => ({
  type: FETCH_SINGLE_POST_ERROR,
  payload: { msg: errMsg }
});

const createPostSuccess = data => ({
  type: CREATE_POST_SUCCESS,
  payload: {
    post: data.post
  }
});

const createPostError = errMsg => ({
  type: CREATE_POST_ERROR,
  payload: { msg: errMsg }
});

const updatePostSuccess = data => ({
  type: UPDATE_POST_SUCCESS,
  payload: {
    post: data.post
  }
});

const updatePostError = errMsg => ({
  type: UPDATE_POST_ERROR,
  payload: { msg: errMsg }
});

const deletePostSuccess = id => ({
  type: DELETE_POST_SUCCESS,
  payload: {
    id
  }
});

const deletePostError = errMsg => ({
  type: DELETE_POST_ERROR,
  payload: { msg: errMsg }
});

export default {
  fetchAllPostsSuccess,
  fetchAllPostsError,
  fetchSinglePostSuccess,
  fetchSinglePostError,
  createPostSuccess,
  createPostError,
  updatePostSuccess,
  updatePostError,
  deletePostSuccess,
  deletePostError
};
