let apiUrl = "prod";
export let API_URL;

if (process.env.NODE_ENV !== "production")
  apiUrl = process.env.REACT_APP_ENV === "prod" ? "prod" : "dev";

if (apiUrl === "prod") {
  API_URL = "https://google.com";
}
if (apiUrl === "dev") {
  API_URL = "http://localhost:3000";
}

export const FETCH_ALL_POSTS = "FETCH_ALL_POSTS";
export const FETCH_ALL_POSTS_SUCCESS = "FETCH_ALL_POSTS_SUCCESS";
export const FETCH_ALL_POSTS_ERROR = "FETCH_ALL_POSTS_ERROR";

export const FETCH_SINGLE_POST = "FETCH_SINGLE_POST";
export const FETCH_SINGLE_POST_SUCCESS = "FETCH_SINGLE_POST_SUCCESS";
export const FETCH_SINGLE_POST_ERROR = "FETCH_SINGLE_POST_ERROR";

export const CREATE_POST = "CREATE_POST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_ERROR = "CREATE_POST_ERROR";

export const UPDATE_POST = "UPDATE_POST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_ERROR = "UPDATE_POST_ERROR";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";