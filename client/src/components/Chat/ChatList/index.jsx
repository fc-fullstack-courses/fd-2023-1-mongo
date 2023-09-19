import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages } from '../../../redux/slices/messagesSlice';
import ChatMessage from '../ChatMessage';

const CHatList = () => {
  const { messages, isLoading, error } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  const messagesListItems = messages.map((message) => (
    <ChatMessage key={message._id} message={message} />
  ));

  return <ul>{messagesListItems}</ul>;
};

export default CHatList;
