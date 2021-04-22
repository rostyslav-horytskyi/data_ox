import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getAvailableComments } from '../store';

export const Comments = () => {
  const comments = useSelector(getAvailableComments);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const postInfo = searchParams.get('postInfo') || 0;


  return (
    <>
      <h1>Comments</h1>
      <ul className="comments">
        {comments
          .filter(comment => comment.postId === +postInfo)
          .map(comment => (
            <li>{comment.body}</li>
        ))}
      </ul>
    </>
  )
};
