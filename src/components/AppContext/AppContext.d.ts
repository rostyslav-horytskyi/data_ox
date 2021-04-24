import React, { Dispatch, SetStateAction } from 'react';
import { Comment, Post, User } from '../../store';
declare type ContextProps = {
    posts: Post[];
    users: User[];
    comments: Comment[];
    setPosts: Dispatch<SetStateAction<Post[]>>;
    setUsers: Dispatch<SetStateAction<User[]>>;
    setComments: Dispatch<SetStateAction<Comment[]>>;
};
export declare const AppContext: React.Context<ContextProps>;
export declare const AppProvider: (props: {
    children: JSX.Element;
}) => JSX.Element;
export {};
