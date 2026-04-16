# 🤖 AI Investment Insights Bot

An AI-powered investment recommendation system that analyzes stock data, predicts future prices using machine learning, and provides **Buy / Sell / Hold** insights with interactive charts.

---

## 🚀 Live Demo

*(Add your deployed link here after deployment)*
👉 https://your-app-link.com

---

## 🌟 Features

* 📊 Real-time stock data using Alpha Vantage API
* 🤖 AI-based stock price prediction (Linear Regression)
* 📈 Interactive stock charts (Chart.js)
* 🔍 Search multiple stocks dynamically
* 💡 Buy / Sell / Hold recommendations
* 🌐 Full-stack integration (Node.js + Python + MongoDB)

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **AI/ML:** Python, Scikit-learn, Pandas, yFinance
* **Charts:** Chart.js

---

## 📂 Project Structure

```
investment-bot/
│
├── server.js
├── routes/
├── controllers/
├── models/
│
├── ml-model/
│   └── predict.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .env
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/shivamkumar72/AI-Investment-Bot.git
cd AI-Investment-Bot
```

---

### 2️⃣ Install backend dependencies

```
npm install
```

---

### 3️⃣ Setup Python environment

```
python -m venv venv
venv\Scripts\activate
pip install pandas numpy scikit-learn yfinance
```

---

### 4️⃣ Setup Environment Variables

Create `.env` file in root folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
STOCK_API_KEY=your_alpha_vantage_api_key
```

---

### 5️⃣ Run the project

```
npm run start
```

Open frontend:

```
frontend/index.html
```

---

## 📊 API Endpoints

* `GET /api/stocks/:symbol` → Fetch stock data
* `GET /api/stocks/predict/:symbol` → AI prediction
* `GET /api/stocks/history/:symbol` → Stock chart data

---

## 🧠 How It Works

1. User enters stock symbol
2. Backend fetches real-time stock data
3. Python ML model predicts next price
4. System generates recommendation
5. Frontend displays result + graph

---



## 🚀 Future Improvements

* 📊 Advanced ML model (LSTM / Deep Learning)
* 📱 Responsive UI (React-based frontend)
* 🔔 Alerts & notifications system
* 💼 Portfolio & watchlist management

---

## 👨‍💻 Author

**Shivam Kumar**

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!
