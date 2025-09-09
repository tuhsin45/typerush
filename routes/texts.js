const express = require('express');
const router = express.Router();

const textSnippets = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once.",
  "Programming is not about what you know; it's about what you can figure out. The best way to learn is by doing.",
  "In the world of technology, change is the only constant. Those who adapt quickly will thrive in the digital age.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. Keep pushing forward.",
  "The beauty of coding lies in its logic and creativity. Every problem has a solution waiting to be discovered.",
  "JavaScript is a versatile language that powers both frontend and backend development in modern web applications.",
  "Data structures and algorithms are the foundation of computer science and efficient programming solutions.",
  "React makes it painless to create interactive user interfaces. Design simple views for each state in your application.",
  "MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing.",
  "Express is a minimal and flexible Node.js web application framework that provides a robust set of features.",
  "CSS is a style sheet language used for describing the presentation of a document written in HTML or XML.",
  "Authentication and authorization are crucial aspects of web security that protect user data and application resources.",
  "RESTful APIs provide a standardized way for different software applications to communicate with each other.",
  "Version control systems like Git help developers track changes and collaborate effectively on software projects.",
  "The MERN stack combines MongoDB, Express, React, and Node.js to create powerful full-stack web applications."
];

router.get('/random', (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * textSnippets.length);
    const selectedText = textSnippets[randomIndex];
    
    res.json({
      text: selectedText,
      length: selectedText.length,
      wordCount: selectedText.split(' ').length
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/all', (req, res) => {
  try {
    res.json({
      texts: textSnippets.map((text, index) => ({
        id: index,
        text: text,
        length: text.length,
        wordCount: text.split(' ').length
      }))
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
