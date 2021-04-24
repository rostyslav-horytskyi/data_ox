import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { setPostId, Post } from '../../store';
import { AppContext } from '../AppContext';

export const PostBlock = (props: { post: Post }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const { posts, setPosts } = useContext(AppContext);
  const { post } = props;

  const showInfo = (id: number = 0) => {
    if (id) {
      searchParams.set('postInfo', `${id}`);
    } else {
      searchParams.delete('postInfo');
    }

    history.push({ search: searchParams.toString() });
    dispatch(setPostId(id));
  };

  const deletePost = (id: number = 0) => {
    const updatedPosts = posts.filter(post => post.id !== id);

    setPosts(updatedPosts);
  };

  return (
    <div className="posts__post">
      <div className="posts__title">{post.title}</div>

      <div className="posts__buttons">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => showInfo(post.id)}
        >
          Show info
        </Button>

        <IconButton onClick={() => deletePost(post.id)}>
          <Delete />
        </IconButton>
      </div>
    </div>
  );
};
