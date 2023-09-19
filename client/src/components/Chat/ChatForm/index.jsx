import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { sendMessage } from '../../../api/ws';

const initialValues = {
  body: '',
};

const ChatForm = () => {
  const { user } = useSelector((state) => ({
    user: state.auth.user,
  }));

  const handleSubmit = (values, formikBag) => {
    const newMessageData = {
      ...values,
      user,
    };

    sendMessage(newMessageData);

    formikBag.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <Field name='body' />
        <button type='submit'>Send message</button>
      </Form>
    </Formik>
  );
};

export default ChatForm;
