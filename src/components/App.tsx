import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsFromServer, getListOfPosts, getPostsFromServer, getUserFromServer, setPage } from "../store";

import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Posts } from "./Posts";
import { useHistory, useLocation } from "react-router";
import { Filters } from "./Filters";
import { Comments } from "./Comments";
import { Button } from "@material-ui/core";
import { AddingNewPost } from "./AddingNewPost";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const App = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get('page') || 1;
  const posts = useSelector(getListOfPosts);
  const postInfo = searchParams.get('postInfo') || 0;

  console.log(+postInfo)

  useEffect(() => {
    dispatch(getPostsFromServer());
  }, []);

  useEffect(() => {
    dispatch(getUserFromServer());
  }, []);

  useEffect(() => {
    dispatch(getCommentsFromServer());
  }, [])

  return (
    <div className="app">
      <h1 className="app_title">My React App</h1>
      <div className="list_of_posts">
        <div className="posts">
          {+postInfo > 0 && (
            <div className="user_info">
              {posts.filter(post => post.id === +postInfo).map(post => (
                <>
                  <h2>{post.title}</h2>
                  <div>{post.body}</div>
                </>
              ))}
              <Comments />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  searchParams.delete('postInfo');
                  history.push({ search: searchParams.toString() });
                }}
              >
                Close
              </Button>
            </div>
          )}
          <Filters />
          <Posts />
          <div className={classes.root}>
            <Pagination
              count={Math.ceil(posts.length / 5)}
              page={+page}
              onChange={(_, value) => {
                dispatch(setPage(value));
                searchParams.set('page', `${value}`)
                history.push({ search: searchParams.toString() });
              }}
            />
          </div>
        </div>
        <div className="form">
          <AddingNewPost />
        </div>
      </div>
    </div>
  );
};

export default App;
