import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentsFromServer,
  getListOfPosts,
  getListOfUsers,
  getPostsFromServer,
  getUserFromServer,
  getAvailableComments,
} from "../store";

import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from "react-loader-spinner";

import { Posts } from "./Posts";
import { useLocation } from "react-router";
import { Filters } from "./Filters";
import { AddingNewPost } from "./AddingNewPosts";
import { AppContext } from "./AppContext";
import { PostInfo } from './PostInfo';
import { PaginationForPosts } from "./PaginationForPosts";

const App = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const postsFromServer = useSelector(getListOfPosts);
  const commentsFromServer = useSelector(getAvailableComments);
  const usersFromServer = useSelector(getListOfUsers);

  const postInfo = searchParams.get('postInfo') || 0;

  const {
    setPosts,
    setUsers,
    setComments
  } = useContext(AppContext);

  useEffect(() => {
    dispatch(getPostsFromServer());
  }, []);

  useEffect(() => {
    dispatch(getUserFromServer());
  }, []);

  useEffect(() => {
    dispatch(getCommentsFromServer());
  }, []);

  useEffect(() => {
    if (postsFromServer.length) {
      setPosts(postsFromServer);
    }

    if (postsFromServer.length) {
      setUsers(usersFromServer);
    }

    if (postsFromServer.length) {
      setComments(commentsFromServer);
    }
  }, []);

  return (
    <div className="app">
      {!postsFromServer.length
      && !usersFromServer.length
      && !commentsFromServer.length ? (
        <div className="loader">
          <h1 className="loader__title">Please wait!</h1>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={200}
            width={200}
          />
        </div>
      ) : (
        <>
          <h1 className="app__title">List of posts</h1>
          <div className="list_of_posts">
            <div className="posts">
              {+postInfo > 0 && (
                <PostInfo />
              )}

              <Filters />

              <Posts />
            </div>
            <AddingNewPost />
          </div>

          <PaginationForPosts />
        </>
      )}
    </div>
  );
};

export default App;
