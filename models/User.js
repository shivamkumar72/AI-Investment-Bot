const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    riskLevel: {
        type: String,
        enum: ['low', 'medium', 'high']
    },
    budget: Number
});

module.exports = mongoose.model('User', userSchema);