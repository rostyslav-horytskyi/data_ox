import React, { SetStateAction, Dispatch, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';

import {
  Comment,
  getNewComment,
  setNewComment,
} from '../../store';

import { AppContext } from '../AppContext';
import { emptyCommentFields } from '../helpers';

export const AddingNewComment = (
  props: {
    postId: number, setVisible: Dispatch<SetStateAction<boolean>>
  }) => {
  const newComment = useSelector(getNewComment);

  const dispatch = useDispatch();

  const { postId, setVisible } = props;
  const { comments, setComments } = useContext(AppContext);

  const createNewComment = (): Comment => {
    return {
      post_id: postId,
      id: comments.length + 1,
      name: newComment.name,
      email: newComment.email,
      body: newComment.body,
    };
  };

  const addNewComment = () => {
    const newComment = createNewComment();
    const updatedComments = [newComment, ...comments];

    setComments(updatedComments);
  };

  return (
    <Form>
      <Form.Group controlId="formBasicText">
        <Form.Control
          type="text"
          placeholder="Name..."
          value={newComment.name}
          onChange={({ target }) => dispatch(setNewComment({ ...newComment, name: target.value }))}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Control
          type="email"
          placeholder="Email..."
          value={newComment.email}
          onChange={({ target }) => dispatch(setNewComment({ ...newComment, email: target.value }))}
        />
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Control
          as="textarea"
          rows={3}
          value={newComment.body}
          onChange={({ target }) => dispatch(setNewComment({ ...newComment, body: target.value }))}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={() => {
          addNewComment();
          setVisible(false);
          dispatch(setNewComment(emptyCommentFields));
        }}
      >
        Add new comment
      </Button>
    </Form>
  );
};
