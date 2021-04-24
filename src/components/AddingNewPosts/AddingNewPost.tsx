import React, { ChangeEvent, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreator } from 'redux';

import { Form, Button } from 'react-bootstrap';

import {
  Post,
  User,
  getNewUser,
  setNewUser,
  getNewPost,
  setNewPost,
} from '../../store';

import { AppContext } from '../AppContext';
import { emptyPostFields, emptyUserFields } from '../helpers';

export const AddingNewPost = () => {
  const newUser = useSelector(getNewUser);
  const newPost = useSelector(getNewPost);

  const dispatch = useDispatch();

  const { posts, users, setUsers, setPosts } = useContext(AppContext);
  const [isVisible, setVisible] = useState(false);

  const handleInputPostField = (
    event: ChangeEvent,
    setAction: ActionCreator<{ type: string, value: Post }>,
    data: string,
  ) => {
    const { value } = event.target as HTMLInputElement;

    dispatch(setAction({ ...newPost, [data]: value }));
  };

  const handleInputUserField = (
    event: ChangeEvent,
    setAction: ActionCreator<{ type: string, value: User }>,
    data: string,
  ) => {
    const { value } = event.target as HTMLInputElement;

    dispatch(setAction({ ...newUser, [data]: value }));
  };

  const createNewUser = (): User => {
    return {
      id: Math.ceil(Math.random() * 1000 - 40),
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
    }
  };

  const createNewPost = (): Post => {
    return {
      user_id: users.length + 1,
      id: Math.ceil(Math.random() * 1000 - 40),
      title: newPost.title,
      body: newPost.body,
    }
  };

  const addNewData = () => {
    const newUser = createNewUser();
    const newPost = createNewPost();

    const updatedUsersList = [newUser, ...users];
    const updatedPostsList = [newPost, ...posts];

    setUsers(updatedUsersList);
    setPosts(updatedPostsList);
  };

  return (
    <div className="comment__form">
      {!isVisible && (
        <Button
          variant="primary"
          onClick={() => setVisible(!isVisible)}
        >
          Add post
        </Button>
      )}

      {isVisible && (
        <Form>
          <Form.Group controlId="formBasicText">
            <Form.Label>Enter the name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name..."
              value={newUser.name}
              onChange={e => handleInputUserField(e, setNewUser, 'name')}
            />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label>Enter the username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username..."
              value={newUser.username}
              onChange={e => handleInputUserField(e, setNewUser, 'username')}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Enter the email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email..."
              value={newUser.email}
              onChange={e => handleInputUserField(e, setNewUser, 'email')}
            />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label>Enter the title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title..."
              value={newPost.title}
              onChange={(e) => handleInputPostField(e, setNewPost, 'title')}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Enter the post</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newPost.body}
              onChange={(e) => handleInputPostField(e, setNewPost, 'body')}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="button"
            onClick={() => {
              addNewData();
              setVisible(!isVisible);
              dispatch(setNewUser(emptyUserFields));
              dispatch(setNewPost(emptyPostFields));
            }}
          >
            Add
          </Button>
        </Form>
      )}
    </div>
  );
};
