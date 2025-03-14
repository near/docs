import '@generated/client-modules';
import React, { useState, useRef, useEffect } from 'react';
import { Button, } from 'react-bootstrap';
import { Chat } from './Chat';
import { MessageCircleCode } from 'lucide-react';
const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => { setIsOpen(!isOpen); };

  return isOpen ?
    <Chat toggleChat={toggleChat} /> : (
      <Button
        className="chat-toggle-button"
        variant="primary"
        onClick={toggleChat}
      >
        <MessageCircleCode />
      </Button>
    )
};

export default AIChat;