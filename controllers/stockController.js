const axios = require('axios');
const { exec } = require('child_process');

// 🔥 Prediction (Python)
exports.predictStock = (req, res) => {
    const symbol = req.params.symbol;

    exec(`python ml-model/predict.py ${symbol}`, (error, stdout, stderr) => {
        if (error || !stdout) {
            return res.json({
                stock: symbol,
                current: 0,
                predicted: 0,
                recommendation: "NO DATA"
            });
        }

        try {
            const result = JSON.parse(stdout);
            res.json(result);
        } catch {
            res.json({
                stock: symbol,
                current: 0,
                predicted: 0,
                recommendation: "ERROR"
            });
        }
    });
};

// 🔥 Graph (Alpha Vantage)
exports.getStockHistory = async (req, res) => {
    const symbol = req.params.symbol;

    try {
        const response = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.STOCK_API_KEY}`
        );

        const data = response.data["Time Series (Daily)"];

        if (!data) {
            return res.json({ dates: [], prices: [] });
        }

        const dates = Object.keys(data).slice(0, 10).reverse();
        const prices = dates.map(date =>
            parseFloat(data[date]["4. close"])
        );

        res.json({ dates, prices });

    } catch {
        res.json({ dates: [], prices: [] });
    }
};