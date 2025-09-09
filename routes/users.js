const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/profile', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user.id,
        email: req.user.email,
        highestWPM: req.user.highestWPM
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/wpm', auth, async (req, res) => {
  try {
    const { wpm } = req.body;

    if (!wpm || wpm < 0) {
      return res.status(400).json({ message: 'Invalid WPM value' });
    }

    if (wpm > req.user.highestWPM) {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { highestWPM: wpm },
        { new: true }
      ).select('-password');

      res.json({
        message: 'New record set!',
        user: {
          id: user.id,
          email: user.email,
          highestWPM: user.highestWPM
        }
      });
    } else {
      res.json({
        message: 'WPM recorded but not a new record',
        user: {
          id: req.user.id,
          email: req.user.email,
          highestWPM: req.user.highestWPM
        }
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
