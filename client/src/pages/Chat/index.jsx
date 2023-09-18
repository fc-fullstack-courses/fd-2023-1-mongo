import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header';
import { getMessages } from '../../redux/slices/messagesSlice';

const ChatPage = () => {
  const { user, messages, isLoading, error } = useSelector((state) => ({
    ...state.message,
    user: state.auth.user,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  const messagesListItems = messages.map((message) => (
    <li key={message._id}>
      <pre>{JSON.stringify(message, null, 4)}</pre>
    </li>
  ));

  return (
    <div>
      <Header />
      <h1>Chat page</h1>
      <ul>{messagesListItems}</ul>
    </div>
  );
};

export default ChatPage;
