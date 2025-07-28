const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Dummy admin credentials for demonstration:
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH; // Pre-hashed password

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.session && req.session.admin) return next();
  res.redirect('/admin/login');
}

// Serve login page
router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: './admin' });
});

// Handle login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username === ADMIN_USERNAME && await bcrypt.compare(password, ADMIN_PASSWORD_HASH)) {
      req.session.admin = username;
      return res.redirect('/admin/dashboard');
    } else {
      return res.redirect('/admin/login?error=Invalid Credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error during login');
  }
});

// Serve dashboard page (protected)
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.sendFile('dashboard.html', { root: './admin' });
});

// Logout endpoint
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

module.exports = router;
