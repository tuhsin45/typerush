import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { calculateWPM, calculateAccuracy, getCharacterStatus, formatTime } from '../utils/typingUtils';

const TypingTest = () => {
  const { user, updateUserWPM } = useAuth();
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentWPM, setCurrentWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newRecord, setNewRecord] = useState(false);
  const inputRef = useRef(null);

  const fetchText = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/texts/random');
      setText(response.data.text);
    } catch (error) {
      console.error('Failed to fetch text:', error);
      setText('The quick brown fox jumps over the lazy dog. This is a fallback text for the typing test.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchText();
  }, [fetchText]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTestComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (userInput.length > 0 && timeLeft < 30) {
      const timeElapsed = 30 - timeLeft;
      const correctChars = calculateCorrectChars();
      const wpm = calculateWPM(correctChars, timeElapsed);
      const acc = calculateAccuracy(correctChars, userInput.length);
      
      setCurrentWPM(wpm);
      setAccuracy(acc);
    }
  }, [userInput, timeLeft]);

  const calculateCorrectChars = () => {
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) {
        correct++;
      }
    }
    return correct;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    if (value.length > text.length) return;
    
    setUserInput(value);
    
    if (!isActive && value.length === 1) {
      setIsActive(true);
    }
    
    if (value.length === text.length) {
      handleTestComplete();
    }
  };

  const handleTestComplete = async () => {
    setIsActive(false);
    setIsComplete(true);
    
    const correctChars = calculateCorrectChars();
    const finalWPM = calculateWPM(correctChars, 30 - timeLeft);
    const finalAccuracy = calculateAccuracy(correctChars, userInput.length);
    
    setCurrentWPM(finalWPM);
    setAccuracy(finalAccuracy);
    
    if (finalWPM > user.highestWPM) {
      try {
        await updateUserWPM(finalWPM);
        setNewRecord(true);
      } catch (error) {
        console.error('Failed to update WPM:', error);
      }
    }
  };

  const resetTest = () => {
    setUserInput('');
    setIsActive(false);
    setTimeLeft(30);
    setCurrentWPM(0);
    setAccuracy(100);
    setIsComplete(false);
    setNewRecord(false);
    fetchText();
    inputRef.current?.focus();
  };

  const renderText = () => {
    return text.split('').map((char, index) => {
      const status = getCharacterStatus(char, userInput[index], index, userInput.length);
      
      let className = 'text-lg';
      switch (status) {
        case 'correct':
          className += ' text-correct';
          break;
        case 'incorrect':
          className += ' text-incorrect';
          break;
        case 'current':
          className += ' text-current';
          break;
        default:
          className += ' text-untyped';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="flex justify-center items-center" style={{ height: '300px' }}>
          <div className="card text-center animate-fade-in">
            <div style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Loading exciting text...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-slide-up">
      <div className="grid grid-cols-4 gap-lg mb-xl">
        <div className="card card-stat">
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-small" style={{ color: 'var(--text-secondary)' }}>Time Left</div>
        </div>
        
        <div className="card card-stat">
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--warning)', marginBottom: '0.5rem' }}>
            {currentWPM}
          </div>
          <div className="text-small" style={{ color: 'var(--text-secondary)' }}>Current WPM</div>
        </div>
        
        <div className="card card-stat">
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--success)', marginBottom: '0.5rem' }}>
            {user.highestWPM}
          </div>
          <div className="text-small" style={{ color: 'var(--text-secondary)' }}>Best WPM</div>
        </div>
        
        <div className="card card-stat">
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
            {accuracy}%
          </div>
          <div className="text-small" style={{ color: 'var(--text-secondary)' }}>Accuracy</div>
        </div>
      </div>

      <div className="card mb-xl">
        <div className="text-display-area">
          {renderText()}
        </div>
      </div>

      <div className="card mb-xl">
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          disabled={isComplete || timeLeft === 0}
          placeholder={isComplete ? "Test completed! Great job!" : "Start typing here..."}
          className="input-field textarea-field"
          style={{ height: '150px', fontSize: '1.125rem' }}
          autoFocus
        />
      </div>

      {isComplete && (
        <div className="card mb-xl text-center animate-slide-up">
          <h3 className="text-title mb-lg" style={{ color: 'var(--primary)' }}>Test Complete!</h3>
          {newRecord && (
            <div style={{ 
              background: 'linear-gradient(135deg, var(--success) 0%, #059669 100%)', 
              color: 'white', 
              padding: 'var(--space-lg)', 
              borderRadius: 'var(--radius-lg)', 
              marginBottom: 'var(--space-lg)',
              fontSize: '1.125rem',
              fontWeight: '600'
            }}>
              New Personal Record! {currentWPM} WPM
            </div>
          )}
          <div className="grid grid-cols-3 gap-lg mb-lg">
            <div className="card card-compact">
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning)' }}>
                {currentWPM}
              </div>
              <div className="text-small" style={{ color: 'var(--text-secondary)' }}>Words Per Minute</div>
            </div>
            <div className="card card-compact">
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)' }}>
                {accuracy}%
              </div>
              <div className="text-small" style={{ color: 'var(--text-secondary)' }}>Accuracy</div>
            </div>
            <div className="card card-compact">
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                {userInput.length}
              </div>
              <div className="text-small" style={{ color: 'var(--text-secondary)' }}>Characters Typed</div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-xl">
        <button
          onClick={resetTest}
          className="btn btn-primary"
          style={{ marginRight: 'var(--space-lg)' }}
        >
          {isComplete ? 'Try Again' : 'Reset Test'}
        </button>
        
        <button
          onClick={fetchText}
          className="btn btn-secondary"
          disabled={isActive}
        >
          New Text
        </button>
      </div>

      <div className="card text-center" style={{ 
        background: 'linear-gradient(135deg, var(--primary-bg) 0%, var(--bg-primary) 100%)',
        border: '2px solid var(--primary-light)'
      }}>
        <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '0.5rem' }}>Type the text above as quickly and accurately as possible.</p>
          <p>The test will start when you begin typing and lasts for 30 seconds.</p>
        </div>
      </div>
    </div>
  );
};

export default TypingTest;
