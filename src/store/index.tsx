import { getPosts, getUsers, getComments } from '../api/post';

import { createStore, Dispatch, AnyAction, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export interface Post {
  user_id?: number,
  id?: number,
  title: string,
  body: string,
}

export interface User {
  id?: number,
  name: string,
  username: string,
  email: string
}

export interface Comment {
  post_id?: number,
  id?: number,
  name: string,
  email: string,
  body: string,
}

// Action types - is just a constant. MUST have a unique value.
const GET_POSTS = 'GET_POSTS';
const GET_USERS = 'GET_USERS';
const GET_COMMENTS = 'GET_COMMENTS';
const GET_PAGE = 'GET_PAGE';
const GET_QUERY = 'GET_QUERY';
const SELECTED_USER = 'SELECTED_USER';
const GET_POST_ID = 'GET_POST_ID';
const GET_NEW_USER = 'GET_NEW_USER';
const GET_NEW_POST = 'GET_NEW_POST';
const GET_NEW_COMMENT = 'GET_NEW_COMMENT';

// Action creators - a function returning an action object
export const setPosts = (posts: Post[]) => ({ type: GET_POSTS, value: posts });
export const setUsers = (users: User[]) => ({ type: GET_USERS, value: users });
export const setComments = (comments: Comment[]) => ({ type: GET_COMMENTS, value: comments });
export const setPage = (page: number) => ({ type: GET_PAGE, value: page });
export const setQuery = (query: string) => ({ type: GET_QUERY, value: query });
export const setSelectedUser = (selectedUser: number) => ({ type: SELECTED_USER, value: selectedUser });
export const setPostId = (postId: number) => ({ type: GET_POST_ID, value: postId });
export const setNewUser = (newUser: User) => ({ type: GET_NEW_USER, value: newUser });
export const setNewPost = (newPost: Post) => ({ type: GET_NEW_POST, value: newPost });
export const setNewComment = (newComment: Comment) => ({ type: GET_NEW_COMMENT, value: newComment });

// Selectors - a function receiving Redux state and returning some data from it
export const getListOfPosts = (state: RootState) => state.posts;
export const getListOfUsers = (state: RootState) => state.users;
export const getAvailableComments = (state: RootState) => state.comments;
export const getPage = (state: RootState) => state.page;
export const getQuery = (state: RootState) => state.query;
export const getSelectedUser = (state: RootState) => state.selectedUser;
export const getPostId = (state: RootState) => state.postId;
export const getNewUser = (state: RootState) => state.newUser;
export const getNewPost = (state: RootState) => state.newPost;
export const getNewComment = (state: RootState) => state.newComment;

// Initial state
export type RootState = {
  posts: Post[],
  users: User[],
  comments: Comment[],
  page: number,
  query: string,
  selectedUser: number,
  postId: number,
  newUser: User,
  newPost: Post,
  newComment: Comment,
};

const initialState: RootState = {
  posts: [],
  users: [],
  comments: [],
  page: 1,
  query: '',
  selectedUser: 0,
  postId: 0,
  newUser: {
    name: '',
    username: '',
    email: '',
  },
  newPost: {
    title: '',
    body: '',
  },
  newComment: {
    name: '',
    email: '',
    body: '',
  },
};

// Get data from server
export const getPostsFromServer = () => {
  return (dispatch: Dispatch) => getPosts()
    .then(posts => {
      localStorage.setItem('posts', JSON.stringify(posts));
      return dispatch(setPosts(posts));
    });
};

export const getUserFromServer = () => {
  return (dispatch: Dispatch) => getUsers()
    .then(users => {
      localStorage.setItem('users', JSON.stringify(users));
      return dispatch(setUsers(users));
    });
};

export const getCommentsFromServer = () => {
  return (dispatch: Dispatch) => getComments()
    .then(comments => {
      localStorage.setItem('comments', JSON.stringify(comments));
      return dispatch(setComments(comments));
    });
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: [...action.value],
      };
    case GET_USERS:
      return {
        ...state,
        users: [...action.value],
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: [...action.value],
      };
    case GET_PAGE:
      return {
        ...state,
        page: action.value,
      };
    case GET_QUERY:
      return {
        ...state,
        query: action.value,
      };
    case SELECTED_USER:
      return {
        ...state,
        selectedUser: action.value,
      }
    case GET_POST_ID:
      return {
        ...state,
        postId: action.value,
      };
    case GET_NEW_USER:
      return {
        ...state,
        newUser: action.value,
      };
    case GET_NEW_POST:
      return {
        ...state,
        newPost: action.value,
      };
    case GET_NEW_COMMENT:
      return {
        ...state,
        newComment: action.value,
      };
    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
