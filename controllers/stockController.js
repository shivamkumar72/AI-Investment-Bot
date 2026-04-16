const axios = require('axios');
const { exec } = require('child_process');


//  1. Get stock data
exports.getStockData = async (req, res) => {
    try {
        const symbol = req.params.symbol;

        const response = await axios.get(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.STOCK_API_KEY}`
        );

        res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: 'Error fetching stock data' });
    }
};


//  2. AI Prediction
exports.predictStock = (req, res) => {
    const symbol = req.params.symbol;

    exec(`python ml-model/predict.py ${symbol}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        try {
            const result = JSON.parse(stdout);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: "Parsing error", raw: stdout });
        }
    });
};


//  3. Stock History (GRAPH)
exports.getStockHistory = async (req, res) => {
    const symbol = req.params.symbol;

    try {
        const response = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.STOCK_API_KEY}`
        );

        const data = response.data["Time Series (Daily)"];

        const dates = Object.keys(data).slice(0, 10).reverse();
        const prices = dates.map(date => parseFloat(data[date]["4. close"]));

        res.json({ dates, prices });

    } catch (err) {
        res.status(500).json({ error: "Error fetching history" });
    }
};