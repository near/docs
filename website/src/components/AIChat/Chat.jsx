import '@generated/client-modules';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useColorMode } from '@docusaurus/theme-common';
import MarkdownRenderer from './MarkdownRenderer';
import { Send, X } from 'lucide-react';
import posthog from 'posthog-js';
import { Question, PRESET_YESNO_LIKE_DISLIKE } from '@feelback/react';
import '@feelback/react/styles/feelback.css';

function splitTextIntoParts(text) {
  if (!text) return [];
  const regex = /(```[\s\S]*?```)/g;
  return text.split(regex).filter((part) => part !== '');
}

export const Chat = ({ toggleChat }) => {
  const { colorMode } = useColorMode();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const [seconds, setSeconds] = useState(1);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  const isDarkTheme = colorMode === 'dark';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorMode);
  }, [colorMode]);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else {
      setSeconds(1);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

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
    const response = await axios.post(
      'https://tmp-docs-ai-service.onrender.com/api/chat',
      {
        messages: userMessage,
        threadId: threadId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;
    const userMessage = { id: Date.now(), text: inputMessage, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInputMessage('');

    setIsLoading(true);

    try {
      const aiResponseText = await getAIResponse(inputMessage);
      setThreadId(aiResponseText.threadId);

      const aiMessage = { id: Date.now() + 1, text: aiResponseText.message, sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      const aiMessage = {
        id: Date.now() + 1,
        text: 'I was not able to process your request, please try again',
        sender: 'ai',
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    }
    setIsLoading(false);
  };

  const handleFeedback = (choice) => {
    posthog.capture('ai_chat_feedback', {
      helpful: choice,
      user_question: messages[messages.length - 2].text,
      ai_answer: messages[messages.length - 1].text,
    });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="floating-chat-container">
      <Card className="chat-card" ref={chatRef}>
        <Card.Header className="chat-header">
          <div className="chat-title">
            <i className="bi bi-robot me-2"></i>
            Docs AI (Beta)
          </div>
          <X className="close-button" onClick={toggleChat} />
        </Card.Header>

        <Card.Body className="chat-body">
          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="welcome-message">How can I help you today?</div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
                >
                  {splitTextIntoParts(msg.text).map((part, index) => {
                    return <MarkdownRenderer part={part} isDarkTheme={isDarkTheme} key={index} />;
                  })}
                  {msg.sender === 'ai' && (
                    <Question
                      text="Was this answer helpful?"
                      items={PRESET_YESNO_LIKE_DISLIKE}
                      showLabels
                      onClick={handleFeedback}
                    />
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="message ai-message loading">Thinking... ({seconds}s)</div>
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
              <Button variant="primary" type="submit" disabled={!inputMessage.trim() || isLoading}>
                <Send size={16} />
              </Button>
            </InputGroup>
          </Form>
        </Card.Footer>
      </Card>
    </div>
  );
};
