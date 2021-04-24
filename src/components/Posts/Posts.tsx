import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import { AppContext } from '../AppContext';
import { PostBlock } from '../PostsBlock';

export const Posts = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get('page') || 1;
  const query = searchParams.get('query') || '';
  const selectedUser = searchParams.get('user') || '';
  const maxPosts = +page * 5;
  const { posts } = useContext(AppContext);

  const searchPosts = () => {
    if (!query.length) {
      return posts;
    }

    return posts
      .filter(post => post.title.includes(query));
  };

  const showPostsForCurrentUser = () => {
    if (!selectedUser) {
      return searchPosts();
    }

    return searchPosts()
      .filter(post => post.user_id === +selectedUser);
  };

  return (
    <div className="posts">
      {showPostsForCurrentUser().slice(maxPosts - 5, maxPosts).map(post => (
        <PostBlock
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
};
