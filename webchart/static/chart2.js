// https://tradingview.github.io/lightweight-charts/tutorials/customization/creating-a-chart
// Make sure to load all python passed data from within the HTML File, then access it her using regular JavaScript

function sanityChecks(data) {
    if (!data || typeof data !== 'object') {
        console.error("webdata is undefined or null.");
        return false;
    }

    const requiredArrays = ['prices', 'sma3'];
    for (const key of requiredArrays) {
        if (!Array.isArray(data[key]) || data[key].length === 0) {
            console.error(`webdata.${key} is missing or not a valid array.`);
            return false;
        }
    }

    return true;
}

function createChart(containerId) {
    return LightweightCharts.createChart(document.getElementById(containerId), {
        layout: {
            background: { color: "#222" },
            textColor: "#C3BCDB",
        },
        grid: {
            vertLines: { color: "#444" },
            horzLines: { color: "#444" },
        },
        crosshair: {
            vertLine: {
                color: '#9B7DFF',
                labelBackgroundColor: '#9B7DFF',
            },
            horzLine: {
                color: '#9B7DFF',
                labelBackgroundColor: '#9B7DFF',
            },
        },
    });
}

function addCandlestickSeries(chart, data) {
    const series = chart.addSeries(LightweightCharts.CandlestickSeries, {
        priceScaleId: 'right',
    });
    series.setData(data);
    return series;
}

function addVolumeSeries(chart, priceData) {
    const volumeData = priceData.map(bar => ({
        time: bar.time,
        value: bar.volume,
        color: bar.close >= bar.open ? '#13534d' : '#792c2a',
    }));

    const series = chart.addSeries(LightweightCharts.HistogramSeries, {
        priceScaleId: 'vol',
        overlay: true,
    });

    series.applyOptions({
        priceFormat: { type: 'volume' },
        color: '#26a69a',
        scaleMargins: { top: 0.75, bottom: 0 },
    });

    series.setData(volumeData);
    return series;
}

function addLineSeries(chart, data, color = '#FFA500') {
    const series = chart.addSeries(LightweightCharts.LineSeries);
    series.applyOptions({
        color,
        lineWidth: 2,
        lineStyle: LightweightCharts.LineStyle.Solid,
    });
    series.setData(data);
    return series;
}

function initializeChart(webdata) {
    const candleStickData = webdata.prices;
    const totalBars = candleStickData.length;
    const N = 300;
    const startIndex = Math.max(0, totalBars - N);

    const chart = createChart('chart_container');

    addCandlestickSeries(chart, candleStickData);
    addVolumeSeries(chart, candleStickData);
    addLineSeries(chart, webdata.sma3, '#FFA500');

    chart.timeScale().setVisibleRange({
        from: candleStickData[startIndex].time,
        to: candleStickData[totalBars - 1].time,
    });

    window.addEventListener('resize', () => {
        chart.resize(window.innerWidth, window.innerHeight);
    });
}

// Main logic
if (sanityChecks(webdata)) {
    initializeChart(webdata);
} else {
    console.error("Sanity checks failed. Please check the data structure.");
    document.getElementById('chart_container').innerHTML = '<p>Error: Invalid data structure.</p>';
}
