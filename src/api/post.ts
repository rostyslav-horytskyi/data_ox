const BASE_URL = 'https://gorest.co.in/public-api';

const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
  .then(response => {
    return response.json()
  })
  .then(result => result.data);
}

export const getPosts = () => request('/posts');
export const getUsers = () => request('/users');
export const getComments = () => request('/comments');
