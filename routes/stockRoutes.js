const express = require('express');
const router = express.Router();

const { 
    getStockData, 
    predictStock, 
    getStockHistory 
} = require('../controllers/stockController');

// ✅ Add user
router.post('/add-user', async (req, res) => {
    const User = require('../models/User');
    const user = new User(req.body);
    await user.save();
    res.json(user);
});

// 🔥 AI Prediction
router.get('/predict/:symbol', predictStock);

// 📈 Stock Graph Data (NEW)
router.get('/history/:symbol', getStockHistory);

// 🔹 Normal stock data (KEEP LAST)
router.get('/:symbol', getStockData);

module.exports = router;