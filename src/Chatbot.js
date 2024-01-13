import React, { useState, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const messageProbability = (userMessage, recognisedWords, singleResponse = false, requiredWords = []) => {
    let messageCertainty = 0;
    let hasRequiredWords = true;

    for (const word of userMessage) {
      if (recognisedWords.includes(word)) {
        messageCertainty += 1;
      }
    }

    const percentage = (messageCertainty / recognisedWords.length) * 100;

    for (const word of recognisedWords) {
      if (!userMessage.includes(word)) {
        hasRequiredWords = false;
        break;
      }
    }

    return hasRequiredWords || singleResponse ? Math.floor(percentage) : 0;
  };

  const checkAllMessages = (message) => {
    const highestProbList = {};

    const response = (botResponse, listOfWords, singleResponse = false, requiredWords = []) => {
      highestProbList[botResponse] = messageProbability(message, listOfWords, singleResponse, requiredWords);
    };

    response("Hello!", ["hello", "hi", "sup", "hey", "heyo"], true);
    // Add more responses...

    const bestMatch = Object.keys(highestProbList).reduce((a, b) => highestProbList[a] > highestProbList[b] ? a : b);
    return highestProbList[bestMatch] < 1 ? 'Unknown' : bestMatch;
  };

  const handleInputSubmit = async () => {
    if (userInput.trim() === '') return;

    const userMessage = { text: userInput, timestamp: new Date(), isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput('');

    setIsBotTyping(true);

    // Simulate bot typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const splitMessage = userInput.toLowerCase().split(/\s+|[,;?!.-]\s*/);
    const botResponse = checkAllMessages(splitMessage);
    const botMessage = { text: botResponse, timestamp: new Date(), isUser: false };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setIsBotTyping(false);
  };

  return (
    <div className="chatbot-container">
      <div className="chat-content">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={message.isUser ? 'user-message' : 'bot-message'}>
              {message.isUser ? 'You' : 'Bot'}:
              <div className="message-content">{message.text}</div>
              <span className="timestamp">{message.timestamp.toLocaleString()}</span>
            </div>
          ))}
          {isBotTyping && <div className="bot-typing">Bot is typing...</div>}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button onClick={handleInputSubmit}>
            <span role="img" aria-label="send">➡️</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
