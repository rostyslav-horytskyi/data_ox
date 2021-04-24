import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

import { AppContext } from '../AppContext';
import { setPage } from '../../store';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export const PaginationForPosts = () => {
  const { posts } = useContext(AppContext);
  const classes = useStyles();
  const history = useHistory();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const page = searchParams.get('page') || 1;
  const query = searchParams.get('query') || '';
  const user = searchParams.get('user') || '';

  const dispatch = useDispatch();

  const availablePosts = () => {
    if (user) {
      return posts.filter(post => post.user_id === +user);
    }

    return posts;
  };


  return (
    <div className={classes.root}>
      <Pagination
        className="pagination"
        count={
          Math.ceil(
            availablePosts()
              .filter(post => post.title.includes(query)
          ).length / 5)
        }
        page={+page}
        onChange={(_, value) => {
          dispatch(setPage(value));
          searchParams.set('page', `${value}`)
          history.push({ search: searchParams.toString() });
        }}
      />
    </div>
  );
};
