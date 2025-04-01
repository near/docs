import '@generated/client-modules';
import React, { useState, useRef, useEffect } from 'react';
import { Button, } from 'react-bootstrap';
import { Chat } from './Chat';
import { BotMessageSquare } from 'lucide-react';
const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => { setIsOpen(!isOpen); };

  return isOpen ?
    <Chat toggleChat={toggleChat} /> : (
        <Button
          className="chat-toggle-button animated-border-box"
          variant="primary"
          onClick={toggleChat}
        >
          <BotMessageSquare size={36} />
        </Button>
    )
};

export default AIChat;