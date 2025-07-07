import yfinance as yf
import pandas as pd
import json 
from datetime import date
from dateutil.relativedelta import relativedelta
from technical_analysis.moving_average import sma
import ta_tools
import ta_tools.indicators

data = yf.download("AAPL", start="2020-01-01", end=date.today().strftime("%Y-%m-%d"))
data = data[['Open', 'High', 'Low', 'Close']].copy()    
data.index = pd.to_datetime(data.index)
data = data.dropna()

data['SMA_20'] = sma(data.Close, 20)
data['SMA20'] = ta_tools.indicators.sma(data['Close'], 20)

print(data)
