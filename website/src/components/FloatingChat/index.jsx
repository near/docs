import '@generated/client-modules';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('how I can create NFT?');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const messagesEndRef = useRef(null);

  const getAIResponse = async (userMessage) => {
    setIsLoading(true);
    
    const response = await axios.post('http://localhost:5000/api/chat', {
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
    setInputMessage('How I can add image?');
    

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

  const toggleChat = () => {

    setIsOpen(!isOpen);
  };

  return (
    <div className="floating-chat-container">
      {isOpen ? (
        <Card className="chat-card">
          <Card.Header className="chat-header">
            <div className="chat-title">
              <i className="bi bi-robot me-2"></i>
              Chat IA
            </div>
            <Button 
              variant="link" 
              className="close-button" 
              onClick={toggleChat}
            >
              X
            </Button>
          </Card.Header>
          
          <Card.Body className="chat-body">
            <div className="messages-container">
              {messages.length === 0 ? (
                <div className="welcome-message">
                  What can I help you with today?
                </div>
              ) : (
                messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
                  >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
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
                />
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={!inputMessage.trim() || isLoading}
                >
                  <i className="bi bi-send"></i>
                  Send
                </Button>
              </InputGroup>
            </Form>
          </Card.Footer>
        </Card>
      ) : (
        <Button 
          className="chat-toggle-button" 
          variant="primary" 
          onClick={toggleChat}
        >
          Chat
        </Button>
      )}
    </div>
  );
};

export default FloatingChat;