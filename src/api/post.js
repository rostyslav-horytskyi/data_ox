const BASE_URL = 'https://jsonplaceholder.typicode.com';

const request = url => fetch(`${BASE_URL}${url}`)
  .then(response => response.json());

export const getPosts = () => request('/posts');
export const getUsers = () => request('/users');
export const getComments = id => request(`/comments`);
