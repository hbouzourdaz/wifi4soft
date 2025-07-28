const express = require('express');
const router = express.Router();
const Software = require('../models/software');
const Category = require('../models/category');

// Get software list with optional filtering
router.get('/software', async (req, res) => {
  try {
    // TODO: Add filtering logic based on req.query.filter if needed
    const softwareList = await Software.find().populate('category');
    res.json(softwareList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching software' });
  }
});

// Get categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching categories' });
  }
});

module.exports = router;
