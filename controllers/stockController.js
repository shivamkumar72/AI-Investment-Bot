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