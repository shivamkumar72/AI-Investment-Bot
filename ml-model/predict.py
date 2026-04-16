import json
import sys
import random

symbol = sys.argv[1]

# 🔥 Fake but realistic prediction (no API)
current = round(random.uniform(150, 300), 2)
predicted = round(current + random.uniform(-2, 2), 2)

change = ((predicted - current) / current) * 100

if change > 1:
    decision = "BUY"
elif change < -1:
    decision = "SELL"
else:
    decision = "HOLD"

result = {
    "stock": symbol,
    "current": current,
    "predicted": predicted,
    "recommendation": decision
}

print(json.dumps(result))