import yfinance as yf
import pandas as pd
from sklearn.linear_model import LinearRegression
import sys
import json

symbol = sys.argv[1]

try:
    data = yf.download(symbol, period="6mo")

    if data.empty or len(data) < 2:
        raise Exception("No data")

    data['Prediction'] = data['Close'].shift(-1)

    X = data[['Close']].values[:-1]
    y = data['Prediction'].values[:-1]

    model = LinearRegression()
    model.fit(X, y)

    last_price = data[['Close']].values[-1].reshape(1, -1)
    predicted_price = model.predict(last_price)[0]

    current = float(last_price[0][0])
    predicted = float(predicted_price)

    change = ((predicted - current) / current) * 100

    if change > 1:
        decision = "BUY"
    elif change < -1:
        decision = "SELL"
    else:
        decision = "HOLD"

    result = {
        "stock": symbol,
        "current": round(current, 2),
        "predicted": round(predicted, 2),
        "recommendation": decision
    }

except:
    # fallback (important)
    result = {
        "stock": symbol,
        "current": 0,
        "predicted": 0,
        "recommendation": "NO DATA"
    }

print(json.dumps(result))