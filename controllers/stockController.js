const { exec } = require('child_process');

// 🔥 Simple in-memory cache (VERY IMPORTANT)
const cache = {};

// ===============================
// ✅ 1. AI Prediction (with cache)
// ===============================
exports.predictStock = (req, res) => {
    const symbol = req.params.symbol.toUpperCase();

    // 🔥 Return cached result (avoid rate limit)
    if (cache[symbol] && Date.now() - cache[symbol].time < 60000) {
        return res.json(cache[symbol].data);
    }

    exec(`python ml-model/predict.py ${symbol}`, (error, stdout, stderr) => {

        if (error || !stdout) {
            return res.json({
                stock: symbol,
                current: 0,
                predicted: 0,
                recommendation: "API LIMIT / NO DATA"
            });
        }

        try {
            const result = JSON.parse(stdout);

            // fallback safety
            if (!result || result.current === 0) {
                return res.json({
                    stock: symbol,
                    current: 0,
                    predicted: 0,
                    recommendation: "NO DATA"
                });
            }

            // 🔥 Save to cache
            cache[symbol] = {
                data: result,
                time: Date.now()
            };

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


// ===============================
// 📈 2. Graph using Python (NO API LIMIT)
// ===============================
exports.getStockHistory = (req, res) => {
    const symbol = req.params.symbol.toUpperCase();

    exec(`python ml-model/history.py ${symbol}`, (error, stdout, stderr) => {

        if (error || !stdout) {
            return res.json({ dates: [], prices: [] });
        }

        try {
            const result = JSON.parse(stdout);
            res.json(result);
        } catch (err) {
            res.json({ dates: [], prices: [] });
        }
    });
};


