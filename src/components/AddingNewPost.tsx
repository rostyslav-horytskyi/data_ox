import React, { ChangeEvent } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getBody, getTitle, setBody, setTitle } from '../store';

export const AddingNewPost = () => {
  const title = useSelector(getTitle);
  const body = useSelector(getBody);
  const dispatch = useDispatch();

  const handleInput = (event: ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;

    dispatch(setTitle(value));
  };

  const handleTextarea = (event: ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;

    dispatch(setBody(value));
  };

  return (
    <>
      <Button
        variant="primary"
      >
        Add post
      </Button>

      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Enter the title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title..."
            value={title}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Enter the post</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={body}
            onChange={handleTextarea}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </>
  );
};
