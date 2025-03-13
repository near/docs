import '@generated/client-modules';
import React, { useState, useRef, useEffect } from 'react';
import { Button, } from 'react-bootstrap';
import { Chat } from './Chat';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => { setIsOpen(!isOpen); };

  return isOpen ?
    <Chat toggleChat={toggleChat}/> : (
    <Button 
      className="chat-toggle-button" 
      variant="primary" 
      onClick={toggleChat}
    >
      💬
    </Button>
      )
};

export default AIChat;