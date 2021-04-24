import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router';
import { AddingNewComment } from '../AddingNewComment';
import { AppContext } from '../AppContext';

export const Comments = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const postInfo = searchParams.get('postInfo') || 0;

  const [isVisible, setVisible] = useState(false);
  const { comments } = useContext(AppContext);

  return (
    <div className="comments">

      <h2>Comments</h2>

      <ul className="comments__list">
        {comments
          .filter(comment => comment.post_id === +postInfo)
          .map(comment => (
            <li
              className="comments__item"
              key={comment.id}
            >
              {comment.body}
            </li>
        ))}
      </ul>

      {!isVisible && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setVisible(true)}
        >
          Add new comment
        </Button>
      )}

      {isVisible && (
        <AddingNewComment setVisible={setVisible} postId={+postInfo} />
      )}
    </div>
  )
};
