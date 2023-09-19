import React from 'react';
import Header from '../../components/Header';
import ChatList from '../../components/Chat/ChatList';
import ChatForm from '../../components/Chat/ChatForm';

const ChatPage = () => {
  return (
    <div>
      <Header />
      <h1>Chat page</h1>
      <ChatForm />
      <ChatList />
    </div>
  );
};

export default ChatPage;
