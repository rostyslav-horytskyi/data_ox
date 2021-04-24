import React, { useContext } from 'react';

import { Comments } from "../Comments";
import { Button } from "@material-ui/core";
import { useHistory, useLocation } from 'react-router';
import { AppContext } from '../AppContext';

export const PostInfo = () => {
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const postInfo = searchParams.get('postInfo') || 0;
  const { posts } = useContext(AppContext);

  return (
    <div className="post__info">
      {posts.filter(post => post.id === +postInfo).map(post => (
        <React.Fragment key={post.id}>
          <h2>{post.title}</h2>
          <div>{post.body}</div>
        </React.Fragment>
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
  );
};
