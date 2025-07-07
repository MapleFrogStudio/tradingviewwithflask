// https://tradingview.github.io/lightweight-charts/tutorials/customization/creating-a-chart
// Make sure to load all python passed data from within the HTML File, then access it her using regular JavaScript


function sanityChecks(data) {
    if (typeof data === 'undefined' || data === null) {
        console.log("webdata is undefined o rNULL.");
        return false;
    }

    if (!Array.isArray(data.prices) || data.prices.length === 0) {
        console.log("webdata.prices is missing or empty.");
        return false;
    }

//    if (!Array.isArray(data.sma3)) {
//        console.log("webdata.sma3 is missing or not an array.");
//        return false;
//    }

    // Add more checks here as needed

    return true; // All checks passed
}

if (sanityChecks(webdata)) {

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
  const mainSeries = chart.addSeries(LightweightCharts.CandlestickSeries, {
    priceScaleId: 'right',
  });
  // Set the data for the Main Series
  mainSeries.setData(candleStickData);

  // Generate volume data from webdata.prices
  const volumeData = webdata.prices.map((bar, index, arr) => {
      //const prevBar = arr[index - 1] || bar;
      const isUp = bar.close >= bar.open;

      return {
          time: bar.time,
          value: bar.volume,
          color: isUp ? '#13534d' : '#792c2a'  // Green for up, red for down
      };
  });
  // Add Volume Histogram Series
  const volumeSeries = chart.addSeries(LightweightCharts.HistogramSeries, {
      priceScaleId: 'vol',
      overlay: true,
  });
  volumeSeries.applyOptions({
      priceFormat: { type: 'volume' },
      color: '#26a69a',  // default color (can be overridden per-bar)
      scaleMargins: {
          top: 0.75,
          bottom: 0
      },
  });  
  // Set the volume data
  volumeSeries.setData(volumeData);

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

}
else{
  console.error("Sanity checks failed. Please check the data structure.");
  // Optionally, you can display an error message in the UI   
  document.getElementById('chart_container').innerHTML = '<p>Error: Invalid data structure.</p>';
}