import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial bot message
    setMessages([
      { sender: 'bot', text: "Hello! I'm your Homemaker assistant. How can I help you today? You can ask about expenses, groceries, salary, protein, or water intake." }
    ]);
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);
      setInput('');
      // Simulate bot response
      setTimeout(() => {
        const botResponse = generateBotResponse(input);
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 500);
    }
  };

  const generateBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    let responseText = "I'm not sure how to help with that. Can you be more specific?";

    if (lowerInput.includes('expense')) {
      responseText = "I can help with tracking your expenses. Would you like to add a new expense or view your expense summary?";
    } else if (lowerInput.includes('grocery') || lowerInput.includes('groceries')) {
      responseText = "I can manage your grocery list. Do you want to add items to your shopping list or check your inventory?";
    } else if (lowerInput.includes('salary') || lowerInput.includes('income')) {
      responseText = "I can record your income. Would you like to add a new income entry or view your income history?";
    } else if (lowerInput.includes('protein')) {
      responseText = "I can track your protein intake. Do you want to log your protein for today or see your progress?";
    } else if (lowerInput.includes('water')) {
      responseText = "I can monitor your water intake. Would you like to log a glass of water or check your daily intake?";
    } else if (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hey')) {
      responseText = "Hello! How can I assist you today? You can ask about expenses, groceries, salary, protein, or water intake.";
    }

    return { sender: 'bot', text: responseText };
  };

  return (
    <div className="chatbot-container">
      <h2>Chatbot Assistant</h2>
      <div className="chatbox">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <span>{msg.text}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
