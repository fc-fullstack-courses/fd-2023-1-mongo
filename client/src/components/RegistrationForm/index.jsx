import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { registration } from '../../redux/slices/authSlice';

const REGISTRATION_SCHEMA = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const RegistrationForm = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, formikBag) => {
    dispatch(registration(values));

    formikBag.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={REGISTRATION_SCHEMA}
    >
      <Form>
        <Field name='firstName' placeholder='first name' />
        <Field name='lastName' placeholder='last name' />
        <Field name='email' type='email' placeholder='email' />
        <Field name='password' type='password' placeholder='password' />
        <button type='submit'>Login</button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
