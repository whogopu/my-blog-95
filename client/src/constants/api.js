import { API_URL } from ".";

export const FETCH_ALL_POSTS_API = (skip, limit) => {
  return `${API_URL}/posts?skip=${skip}&limit=${limit}`;
};

export const FETCH_SINGLE_POST_API = (id) => {
  return `${API_URL}/posts/${id}`;
};

export const CREATE_POST_API = (data) => {
  return `${API_URL}/posts`;
};

export const UPDATE_POST_API = (id) => {
  return `${API_URL}/posts/${id}`;
};

export const DELETE_POST_API = (id) => {
  return `${API_URL}/posts/${id}`;
};