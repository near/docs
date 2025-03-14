import '@generated/client-modules';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useColorMode } from '@docusaurus/theme-common';
import MarkdownRenderer from './MarkdownRenderer';
import { Send, X } from 'lucide-react';


function splitTextIntoParts(text) {
  const regex = /(```[\s\S]*?```)/g;
  return text.split(regex).filter(part => part !== '');
}

export const Chat = ({ toggleChat }) => {
  const { colorMode } = useColorMode();
  const [messages, setMessages] = useState([
    {
      "id": 1741973644462,
      "text": "give me the code of a hello word smart contract in rust",
      "sender": "user"
    },
    {
      "id": 1741973659720,
      "text": "The given Rust code defines a smart contract named `hello_world` using the `ink_lang` library. The contract has a constructor `new` that initializes a message, and two functions: `get_message` to retrieve the message and `set_message` to update the message. The `ink` macro is used to mark the contract and its functions for compilation. This contract can be used as a basic example for creating and interacting with smart contracts on a blockchain platform.\n\nFind more information here:\n\n- [https://docs.near.org/docs/build/smart-contracts/anatomy/best-practices](https://docs.near.org/docs/build/smart-contracts/anatomy/best-practices)\n- [https://docs.near.org/docs/build/smart-contracts/anatomy/serialization-protocols](https://docs.near.org/docs/build/smart-contracts/anatomy/serialization-protocols)\n- [https://docs.near.org/docs/build/smart-contracts/anatomy/functions](https://docs.near.org/docs/build/smart-contracts/anatomy/functions)\n",
      "sender": "ai"
    },
    {
      "id": 1741973699798,
      "text": "can you show the code?",
      "sender": "user"
    },
    {
      "id": 1741973708945,
      "text": "Here is a simple \"Hello World\" smart contract written in Rust:  ```rust    \n// Define the contract structure\n#[near(contract_state)]\npub struct Contract {\n    greeting: String,\n}\n\n// Define the default, which automatically initializes the contract\nimpl Default for Contract {\n    fn default() -> Self {\n        Self {\n            greeting: \"Hello\".to_string(),\n        }\n    }\n}\n\n// Implement the contract structure\n#[near]\nimpl Contract {\n    // Public method - returns the greeting saved, defaulting to DEFAULT_GREETING\n    pub fn get_greeting(&self) -> String {\n        self.greeting.clone()\n    }\n\n    // Public method - accepts a greeting, such as \"howdy\", and records it\n    pub fn set_greeting(&mut self, greeting: String) {\n        log!(\"Saving greeting: {}\", greeting);\n        self.greeting = greeting;\n    }\n}\n```\n\nFind more information here:\n\n- [https://docs.near.org/docs/build/smart-contracts/quickstart](https://docs.near.org/docs/build/smart-contracts/quickstart)\n",
      "sender": "ai"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);
  const inputRef = useRef(null); 

  const isDarkTheme = colorMode === 'dark';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorMode);
  }, [colorMode]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        toggleChat();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleChat]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        toggleChat();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleChat]);

  const getAIResponse = async (userMessage) => {
    setIsLoading(true);

    const response = await axios.post('https://tmp-docs-ai-service.onrender.com/api/chat', {
      messages: userMessage,
      threadId: threadId
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    setIsLoading(false);
    return response.data;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;
    const userMessage = { id: Date.now(), text: inputMessage, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInputMessage('');

    const aiResponseText = await getAIResponse(inputMessage);
    setThreadId(aiResponseText.threadId);

    const aiMessage = { id: Date.now() + 1, text: aiResponseText.message, sender: 'ai' };
    setMessages(prevMessages => [...prevMessages, aiMessage]);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return <div className="floating-chat-container">
    <Card className="chat-card"  ref={chatRef}>
      <Card.Header className="chat-header">
        <div className="chat-title">
          <i className="bi bi-robot me-2"></i>
          Near IA
        </div>
        <X
          className="close-button"
          onClick={toggleChat} />
      </Card.Header>

      <Card.Body className="chat-body">
        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="welcome-message">
              How can I help you today?
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
              >
                {splitTextIntoParts(msg.text).map((part, index) => {
                  return (<MarkdownRenderer part={part} isDarkTheme={isDarkTheme} key={index} />)
                })}
              </div>
            ))
          )}
          {isLoading && (
            <div className="ai-message loading">
              <div className="dot-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </Card.Body>

      <Card.Footer className="chat-footer">
        <Form onSubmit={handleSendMessage}>
          <InputGroup>
            <Form.Control
              className="input-message"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              ref={inputRef}
            />
            <Button
              variant="primary"
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
            >
              <Send size={16} />
            </Button>
          </InputGroup>
        </Form>
      </Card.Footer>
    </Card>
  </div>
}
