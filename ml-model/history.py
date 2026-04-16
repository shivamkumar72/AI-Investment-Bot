import yfinance as yf
import json
import sys
import time

symbol = sys.argv[1]

time.sleep(1)  # avoid rate limit

data = yf.download(symbol, period="10d")

if data.empty:
    print(json.dumps({"dates": [], "prices": []}))
    exit()

dates = data.index.strftime('%Y-%m-%d').tolist()
prices = data['Close'].tolist()

print(json.dumps({
    "dates": dates,
    "prices": prices
}))