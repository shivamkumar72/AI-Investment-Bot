const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    stocks: [
        {
            symbol: String,
            quantity: Number,
            buyPrice: Number
        }
    ]
});

module.exports = mongoose.model('Portfolio', portfolioSchema);