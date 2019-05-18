import React from 'react';
import Form from 'react-bootstrap/Form';

export default ({message}) => <Form.Control.Feedback type="invalid">{message}</Form.Control.Feedback>