const axios = require('axios');
const { exec } = require('child_process');


// ✅ 1. Get stock data
exports.getStockData = async (req, res) => {
    try {
        const symbol = req.params.symbol;

        const response = await axios.get(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.STOCK_API_KEY}`
        );

        // 🔥 Handle API limit or empty data
        if (!response.data["Global Quote"]) {
            return res.json({ message: "API limit reached or no data" });
        }

        res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: 'Error fetching stock data' });
    }
};



// ✅ 2. AI Prediction (SAFE)
exports.predictStock = (req, res) => {
    const symbol = req.params.symbol;

    exec(`python ml-model/predict.py ${symbol}`, (error, stdout, stderr) => {

        // 🔥 Handle Python error / API limit
        if (error || !stdout || stderr) {
            return res.json({
                stock: symbol,
                current: 0,
                predicted: 0,
                recommendation: "API LIMIT / NO DATA"
            });
        }

        try {
            const result = JSON.parse(stdout);

            // 🔥 Extra safety check
            if (!result || result.current === 0) {
                return res.json({
                    stock: symbol,
                    current: 0,
                    predicted: 0,
                    recommendation: "NO DATA"
                });
            }

            res.json(result);

        } catch (err) {
            res.json({
                stock: symbol,
                current: 0,
                predicted: 0,
                recommendation: "ERROR"
            });
        }
    });
};



// ✅ 3. Stock History (GRAPH SAFE)
exports.getStockHistory = async (req, res) => {
    const symbol = req.params.symbol;

    try {
        const response = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.STOCK_API_KEY}`
        );

        const data = response.data["Time Series (Daily)"];

        // 🔥 Handle API limit
        if (!data) {
            return res.json({ dates: [], prices: [] });
        }

        const dates = Object.keys(data).slice(0, 10).reverse();
        const prices = dates.map(date => parseFloat(data[date]["4. close"]));

        res.json({ dates, prices });

    } catch (err) {
        res.json({ dates: [], prices: [] });
    }
};