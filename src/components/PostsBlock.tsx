import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { setPostId } from '../store';

interface Post {
  userId: number,
  id: number,
  title: string,
  body: string,
}

export const PostBlock = (props: { post: Post, onDelete: (id:number) => void }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const { post, onDelete } = props;

  const showInfo = (id: number) => {
    if (id) {
      searchParams.set('postInfo', `${id}`);
    } else {
      searchParams.delete('postInfo');
    }

    history.push({ search: searchParams.toString() });
    dispatch(setPostId(id));
  };

  return (
    <div className="post">
      <h1 className="title">{post.title}</h1>

      <div className="description">{post.body}</div>

      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => showInfo(post.id)}
      >
        Show info
      </Button>

      <IconButton onClick={() => onDelete(post.id)}>
        <Delete />
      </IconButton>
    </div>
  );
}
