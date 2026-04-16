import yfinance as yf
import pandas as pd
from sklearn.linear_model import LinearRegression
import time
time.sleep(1)

def predict_stock(symbol):
    data = yf.download(symbol, period="6mo")

    # ❗ FIX: handle empty data
    if data.empty or len(data) < 2:
        return 0, 0

    data['Prediction'] = data['Close'].shift(-1)

    X = data[['Close']].values[:-1]
    y = data['Prediction'].values[:-1]

    if len(X) == 0 or len(y) == 0:
        return 0, 0

    model = LinearRegression()
    model.fit(X, y)

    last_price = data[['Close']].values[-1].reshape(1, -1)
    predicted_price = model.predict(last_price)[0]

    return float(last_price[0][0]), float(predicted_price)

def get_recommendation(current, predicted):
    change = ((predicted - current) / current) * 100

    if change > 1:
        return "BUY"
    elif change < -1:
        return "SELL"
    else:
        return "HOLD"


import sys
import json

if __name__ == "__main__":
    symbol = sys.argv[1]

    current, predicted = predict_stock(symbol)
    decision = get_recommendation(current, predicted)

result = {
    "stock": symbol,
    "current": round(current, 2),
    "predicted": round(predicted, 2),
    "recommendation": decision if current != 0 else "NO DATA"
}

print(json.dumps(result))