import yfinance as yf
import pandas as pd
import json 
from datetime import date
from dateutil.relativedelta import relativedelta
from technical_analysis.moving_average import sma
import ta_tools
import ta_tools.indicators
from webchart import data

data1 = yf.download("AAPL", start="2020-01-01", end=date.today().strftime("%Y-%m-%d"))
data1 = data1[['Open', 'High', 'Low', 'Close']].copy()    
data1.index = pd.to_datetime(data1.index)
data1 = data1.dropna()

data1['SMA_20'] = sma(data1.Close, 20)
data1['SMA20'] = ta_tools.indicators.sma(data1['Close'], 20)

print(data1)
print('================================')

prices = data.prices_to_json(data1)
print(prices[:20])