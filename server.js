const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'frontend')));
// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/stocks', require('./routes/stockRoutes'));
// DB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
console.log("MONGO_URI:", process.env.MONGO_URI);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));