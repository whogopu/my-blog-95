import {
	FETCH_ALL_POSTS,
	FETCH_ALL_POSTS_SUCCESS,
	FETCH_ALL_POSTS_ERROR
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

export default {
  fetchAllPosts,
  fetchAllPostsSuccess,
  fetchAllPostsError
};
