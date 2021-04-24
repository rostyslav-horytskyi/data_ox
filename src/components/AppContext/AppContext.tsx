import React, { Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from '@penseapp/uselocalstorage';
import { Comment, Post, User } from '../../store';

type ContextProps = {
  posts: Post[],
  users: User[],
  comments: Comment[],
  setPosts: Dispatch<SetStateAction<Post[]>>,
  setUsers: Dispatch<SetStateAction<User[]>>,
  setComments: Dispatch<SetStateAction<Comment[]>>,
};

const contextProps = {
  posts: [],
  users: [],
  comments: [],
  setPosts: () => {},
  setUsers: () => {},
  setComments: () => {},
};

export const AppContext = React.createContext<ContextProps>(contextProps);

export const AppProvider = (props: { children: JSX.Element }) => {
  const [posts, setPosts] = useLocalStorage('posts', []);
  const [users, setUsers] = useLocalStorage('users', []);
  const [comments, setComments] = useLocalStorage('comments', []);

  const contextValue = {
    posts,
    users,
    comments,
    setPosts,
    setUsers,
    setComments,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

