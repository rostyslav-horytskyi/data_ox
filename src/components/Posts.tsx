import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getListOfPosts, setPosts } from '../store';
import { PostBlock } from './PostsBlock';

export const Posts = () => {
  const posts = useSelector(getListOfPosts);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get('page') || 1;
  const query = searchParams.get('query') || '';
  const selectedUser = searchParams.get('user') || '';
  const maxPosts = +page * 5;

  const searchPosts = () => {
    if (!query.length) {
      return posts;
    }

    return posts.filter(post => post.title.includes(query));
  };

  const showPostsForCurrentUser = () => {
    if (!selectedUser) {
      return searchPosts();
    }

    return searchPosts().filter(post => post.userId === +selectedUser);
  };

  const deletePost = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id);

    dispatch(setPosts(updatedPosts));
  }

  return (
    <div className="posts">
      {showPostsForCurrentUser().slice(maxPosts - 5, maxPosts).map(post => (
        <PostBlock
          key={post.id}
          post={post}
          onDelete={deletePost}
        />
      ))}
    </div>
  );
};
