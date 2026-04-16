let chart;

async function getPrediction() {
    const symbol = document.getElementById("symbol").value;
    const resultDiv = document.getElementById("result");

    if (!symbol) {
        resultDiv.innerHTML = "Please enter a symbol";
        return;
    }

    try {
        // 🔹 1. Get AI prediction
        const response = await fetch(`http://localhost:5000/api/stocks/predict/${symbol}`);
        const data = await response.json();

        resultDiv.innerHTML = `
            <p><strong>Stock:</strong> ${data.stock}</p>
            <p><strong>Current:</strong> $${data.current}</p>
            <p><strong>Predicted:</strong> $${data.predicted}</p>
            <p><strong>Recommendation:</strong> ${data.recommendation}</p>
        `;

        // 🔥 2. Get stock history for graph
        const historyRes = await fetch(`http://localhost:5000/api/stocks/history/${symbol}`);
        const historyData = await historyRes.json();

        drawChart(historyData.dates, historyData.prices);

    } catch (error) {
        resultDiv.innerHTML = "Error fetching data";
        console.error(error);
    }
}


// 📈 Chart function
function drawChart(labels, data) {
    const ctx = document.getElementById('stockChart').getContext('2d');

    // Remove old chart before creating new one
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Price',
                data: data,
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: "white"
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: "white" }
                },
                y: {
                    ticks: { color: "white" }
                }
            }
        }
    });
}