import { getPosts, getUsers, getComments } from '../api/post';

import { createStore, Dispatch, AnyAction, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

interface Post {
  userId: number,
  id: number,
  title: string,
  body: string,
}

export interface User {
  id: number,
  name: string,
  useranme: string,
  email: string
}

interface Comment {
  postId: number,
  id: number,
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
const GET_TITLE = 'GET_TITLE';
const GET_BODY = 'GET_BODY';

// Action creators - a function returning an action object
export const setPosts = (posts: Post[]) => ({ type: GET_POSTS, value: posts });
export const setUsers = (users: User[]) => ({ type: GET_USERS, value: users });
export const setComments = (comments: Comment) => ({ type: GET_COMMENTS, value: comments });
export const setPage = (page: number) => ({ type: GET_PAGE, value: page });
export const setQuery = (query: string) => ({ type: GET_QUERY, value: query });
export const setSelectedUser = (selectedUser: number) => ({ type: SELECTED_USER, value: selectedUser });
export const setPostId = (postId: number) => ({ type: GET_POST_ID, value: postId }); 
export const setTitle = (title: string) => ({ type: GET_TITLE, value: title });
export const setBody = (body: string) => ({ type: GET_BODY, value: body });

// Selectors - a function receiving Redux state and returning some data from it
export const getListOfPosts = (state: RootState) => state.posts;
export const getListOfUsers = (state: RootState) => state.users;
export const getAvailableComments = (state: RootState) => state.comments;
export const getPage = (state: RootState) => state.page;
export const getQuery = (state: RootState) => state.query;
export const getSelectedUser = (state: RootState) => state.selectedUser;
export const getPostId = (state: RootState) => state.postId;
export const getTitle = (state: RootState) => state.title;
export const getBody = (state: RootState) => state.body;

// Initial state
export type RootState = {
  posts: Post[],
  users: User[],
  comments: Comment[],
  page: number,
  query: string,
  selectedUser: number,
  postId: number,
  title: string,
  body: string,
};

const initialState: RootState = {
  posts: [],
  users: [],
  comments: [],
  page: 1,
  query: '',
  selectedUser: 0,
  postId: 0,
  title: '',
  body: '',
};

// Get data from server
export const getPostsFromServer = () => {
  return (dispatch: Dispatch) => getPosts()
    .then(posts => dispatch(setPosts(posts)));
};

export const getUserFromServer = () => {
  return (dispatch: Dispatch) => getUsers()
    .then(users => dispatch(setUsers(users)));
};

export const getCommentsFromServer = () => {
  return (dispatch: Dispatch) => getComments()
    .then(comments => dispatch(setComments(comments)));
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
        query: action.query,
      };
    case SELECTED_USER:
      return {
        ...state,
        selectedUser: action.selectedUser,
      }
    case GET_POST_ID:
      return {
        ...state,
        postId: action.postId,
      };
    case GET_TITLE:
      return {
        ...state,
        title: action.title,
      }
    case GET_BODY:
      return {
        ...state,
        body: action.body,
      }
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
