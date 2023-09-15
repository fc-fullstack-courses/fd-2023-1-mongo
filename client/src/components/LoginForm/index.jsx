import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';

const LOGIN_SCHEMA = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const initialValues = {
  email: 'user1@gmail.com',
  password: '12345admin',
};

const LoginForm = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, formikBag) => {
    dispatch(login(values));

    formikBag.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LOGIN_SCHEMA}
    >
      <Form>
        <Field name='email' type='email' placeholder='email' />
        <Field name='password' type='password' placeholder='password' />
        <button type='submit'>Login</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
