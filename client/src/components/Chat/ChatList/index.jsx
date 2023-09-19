import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages } from '../../../redux/slices/messagesSlice';

const CHatList = () => {
  const { messages, isLoading, error } = useSelector((state) => state.message);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  const messagesListItems = messages.map((message) => (
    <li key={message._id}>
      <pre>{JSON.stringify(message, null, 4)}</pre>
    </li>
  ));

  return <ul>{messagesListItems}</ul>;
};

export default CHatList;
