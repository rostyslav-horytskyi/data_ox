import { Dispatch, AnyAction } from 'redux';
export interface Post {
    user_id?: number;
    id?: number;
    title: string;
    body: string;
}
export interface User {
    id?: number;
    name: string;
    username: string;
    email: string;
}
export interface Comment {
    post_id?: number;
    id?: number;
    name: string;
    email: string;
    body: string;
}
export declare const setPosts: (posts: Post[]) => {
    type: string;
    value: Post[];
};
export declare const setUsers: (users: User[]) => {
    type: string;
    value: User[];
};
export declare const setComments: (comments: Comment[]) => {
    type: string;
    value: Comment[];
};
export declare const setPage: (page: number) => {
    type: string;
    value: number;
};
export declare const setQuery: (query: string) => {
    type: string;
    value: string;
};
export declare const setSelectedUser: (selectedUser: number) => {
    type: string;
    value: number;
};
export declare const setPostId: (postId: number) => {
    type: string;
    value: number;
};
export declare const setNewUser: (newUser: User) => {
    type: string;
    value: User;
};
export declare const setNewPost: (newPost: Post) => {
    type: string;
    value: Post;
};
export declare const setNewComment: (newComment: Comment) => {
    type: string;
    value: Comment;
};
export declare const getListOfPosts: (state: RootState) => Post[];
export declare const getListOfUsers: (state: RootState) => User[];
export declare const getAvailableComments: (state: RootState) => Comment[];
export declare const getPage: (state: RootState) => number;
export declare const getQuery: (state: RootState) => string;
export declare const getSelectedUser: (state: RootState) => number;
export declare const getPostId: (state: RootState) => number;
export declare const getNewUser: (state: RootState) => User;
export declare const getNewPost: (state: RootState) => Post;
export declare const getNewComment: (state: RootState) => Comment;
export declare type RootState = {
    posts: Post[];
    users: User[];
    comments: Comment[];
    page: number;
    query: string;
    selectedUser: number;
    postId: number;
    newUser: User;
    newPost: Post;
    newComment: Comment;
};
export declare const getPostsFromServer: () => (dispatch: Dispatch) => Promise<{
    type: string;
    value: Post[];
}>;
export declare const getUserFromServer: () => (dispatch: Dispatch) => Promise<{
    type: string;
    value: User[];
}>;
export declare const getCommentsFromServer: () => (dispatch: Dispatch) => Promise<{
    type: string;
    value: Comment[];
}>;
declare const store: import("redux").Store<RootState, AnyAction> & {
    dispatch: unknown;
};
export default store;
