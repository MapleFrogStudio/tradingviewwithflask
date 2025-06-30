// https://tradingview.github.io/lightweight-charts/tutorials/customization/creating-a-chart

function getPriceData2() {
return [
    { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 }, 
    { open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 }, 
    { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 }, 
    { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 }, 
    { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 }, 
    { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 }, 
    { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 }, 
    { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 }, 
    { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 }, 
    { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 }
]
}        

function getPriceData1() {
return [
    { open: 10,    high: 10.63, low: 9.49,  close: 9.55,  time: '2018-12-03' }, 
    { open: 9.55,  high: 10.30, low: 9.42,  close: 9.94,  time: '2018-12-04' }, 
    { open: 9.94,  high: 10.17, low: 9.92,  close: 9.78,  time: '2018-12-05' }, 
    { open: 9.78,  high: 10.59, low: 9.18,  close: 9.51,  time: '2018-12-06' }, 
    { open: 9.51,  high: 10.46, low: 9.10,  close: 10.17, time: '2018-12-07' }, 
    { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: '2018-12-08' }, 
    { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: '2018-12-09' }, 
    { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: '2018-12-10' }, 
    { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: '2018-12-11' }, 
    { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: '2018-12-12' }
]
}        


// Create the Lightweight Chart within the container element
const chart = LightweightCharts.createChart(
    document.getElementById('container'),
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


// Generate sample data to use within a candlestick series
const candleStickData = getPriceData1();

// Create the Main Series (Candlesticks)
const mainSeries = chart.addSeries(LightweightCharts.CandlestickSeries);
// Set the data for the Main Series
mainSeries.setData(candleStickData);

window.addEventListener('resize', () => { chart.resize(window.innerWidth, window.innerHeight);});

chart.timeScale().fitContent();