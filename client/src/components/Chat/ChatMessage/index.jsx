import React from 'react';

const ChatMessage = ({
  message: {
    user: { firstName, lastName },
    body,
  },
}) => {
  return (
    <li>
      <p>
        <span style={{ fontWeight: 'bold' }}>
          {firstName} {lastName} says:
        </span>
        <span> {body}</span>
      </p>
    </li>
  );
};

export default ChatMessage;
