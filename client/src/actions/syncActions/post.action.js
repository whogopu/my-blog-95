import {
	FETCH_ALL_POSTS,
	FETCH_ALL_POSTS_SUCCESS,
  FETCH_ALL_POSTS_ERROR,
  FETCH_SINGLE_POST,
  FETCH_SINGLE_POST_SUCCESS,
  FETCH_SINGLE_POST_ERROR
} from "../../constants";

const fetchAllPosts = () => ({ type: FETCH_ALL_POSTS });

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

const fetchSinglePost = () => ({ type: FETCH_SINGLE_POST });

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

export default {
  fetchAllPosts,
  fetchAllPostsSuccess,
  fetchAllPostsError,
  fetchSinglePost,
  fetchSinglePostSuccess,
  fetchSinglePostError
};
