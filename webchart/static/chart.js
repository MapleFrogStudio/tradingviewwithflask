// https://tradingview.github.io/lightweight-charts/tutorials/customization/creating-a-chart
// Make sure to load all python passed data from within the HTML File, then access it her using regular JavaScript

const candleStickData = webdata.prices
const totalBars = candleStickData.length;
const N = 300;  // number of bars you want to display

// Get the last N time values
const startIndex = Math.max(0, totalBars - N);
const fromTime = candleStickData[startIndex].time;
const toTime = candleStickData[totalBars - 1].time;

// Create the Lightweight Chart within the container element
const chart = LightweightCharts.createChart(
    document.getElementById('chart_container'),
        {
          layout: {
            background: { color: "#222" },
            textColor: "#C3BCDB",
          },
          grid: {
            vertLines: { color: "#444" },
            horzLines: { color: "#444" },
          },
        }
);   

// Customizing the Crosshair
chart.applyOptions({
    crosshair: {
        // Vertical crosshair line (showing Date in Label)
        vertLine: {
            color: '#9B7DFF',
            labelBackgroundColor: '#9B7DFF',
        },

        // Horizontal crosshair line (showing Price in Label)
        horzLine: {
            color: '#9B7DFF',
            labelBackgroundColor: '#9B7DFF',
        },
    },
});

// Create the Main Series (Candlesticks)
const mainSeries = chart.addSeries(LightweightCharts.CandlestickSeries);
// Set the data for the Main Series
mainSeries.setData(candleStickData);


// ADDING OPTIONAL LINE SERIES DATA, example: Simple MOving Average (SMA)
// Add SMA line series
const smaSeries = chart.addSeries(LightweightCharts.LineSeries);
smaSeries.applyOptions({
    color: '#FFA500',  // orange
    lineWidth: 2,
    lineStyle: LightweightCharts.LineStyle.Solid, // Optional
});
// Set SMA data
smaSeries.setData(webdata.sma3);

window.addEventListener('resize', () => { chart.resize(window.innerWidth, window.innerHeight);});

//chart.timeScale().fitContent();

chart.timeScale().setVisibleRange({
  from: fromTime,
  to: toTime,
});