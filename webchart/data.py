import pandas as pd
import yfinance as yf
import json
from datetime import date
from dateutil.relativedelta import relativedelta


def fake_prices_timestamp():
    return [
        { "open": 10,    "high": 10.63, "low": 9.49,  "close": 9.55,  "time": 1642427876 }, 
        { "open": 9.55,  "high": 10.30, "low": 9.42,  "close": 9.94,  "time": 1642514276 }, 
        { "open": 9.94,  "high": 10.17, "low": 9.92,  "close": 9.78,  "time": 1642600676 }, 
        { "open": 9.78,  "high": 10.59, "low": 9.18,  "close": 9.51,  "time": 1642687076 }, 
        { "open": 9.51,  "high": 10.46, "low": 9.10,  "close": 10.17, "time": 1642773476 }, 
        { "open": 10.17, "high": 10.96, "low": 10.16, "close": 10.47, "time": 1642859876 }, 
        { "open": 10.47, "high": 11.39, "low": 10.40, "close": 10.81, "time": 1642946276 }, 
        { "open": 10.81, "high": 11.60, "low": 10.30, "close": 10.75, "time": 1643032676 }, 
        { "open": 10.75, "high": 11.60, "low": 10.49, "close": 10.93, "time": 1643119076 }, 
        { "open": 10.93, "high": 11.53, "low": 10.76, "close": 10.96, "time": 1643205476 }
    ]
    
def fake_prices_datetime():
    return [
        { "open": 120.45, "high": 130.12, "low": 115.23, "close": 118.76, "time": "2025-02-01T18:12:33+01:00" },
        { "open": 118.76, "high": 127.89, "low": 114.50, "close": 123.40, "time": "2025-02-02T18:12:33+01:00" },
        { "open": 123.40, "high": 128.35, "low": 121.10, "close": 122.15, "time": "2025-02-03T18:12:33+01:00" },
        { "open": 122.15, "high": 135.40, "low": 117.85, "close": 121.90, "time": "2025-02-04T18:12:33+01:00" },
        { "open": 121.90, "high": 132.78, "low": 119.65, "close": 130.25, "time": "2025-02-05T18:12:33+01:00" },
        { "open": 130.25, "high": 139.60, "low": 129.90, "close": 136.80, "time": "2025-02-08T18:12:33+01:00" },
        { "open": 136.80, "high": 145.30, "low": 133.75, "close": 140.95, "time": "2025-02-09T18:12:33+01:00" },
        { "open": 140.95, "high": 148.90, "low": 135.60, "close": 138.70, "time": "2025-02-10T18:12:33+01:00" },
        { "open": 138.70, "high": 144.80, "low": 137.25, "close": 141.10, "time": "2025-02-11T18:12:33+01:00" },
        { "open": 141.10, "high": 146.25, "low": 140.40, "close": 144.30, "time": "2025-02-12T18:12:33+01:00" }
    ]
    
def df_to_json(df):
    df = df[['Open', 'High', 'Low', 'Close']].copy()
    df.index = pd.to_datetime(df.index)
    df = df.dropna()
    result = [
        {
            'open': round(row.Open, 2),
            'high': round(row.High, 2),
            'low': round(row.Low, 2),
            'close': round(row.Close, 2),
            'time': index.isoformat()
        }
        for index,row in df.iterrows()
    ]  
    return result   

def getPricesFromYahoo(symbols=['AAPL']):
    if not isinstance(symbols,list):
        raise ValueError("Symbols must be a list.")
    if len(symbols) < 1:
        raise ValueError("At least one symbol is required.")
    
    #data = yf.download(symbols, interval="1d", ignore_tz = True, prepost=False)
    end_dt = date.today()
    start_dt = end_dt - relativedelta(years=3)
    data = yf.download(symbols, start=start_dt, end=end_dt, interval='1d', ignore_tz = True, prepost=False)

    data.index.name = 'Datetime'
    data = data.loc[(slice(None)),(slice(None),slice(None))].copy()
    data = data.stack()
    data = data.reset_index()
    data.rename(columns={'level_1': 'Symbol'}, inplace=True)
    data.rename(columns={'level_0': 'Datetime'}, inplace=True)
    data.set_index('Datetime', inplace=True)
    data.columns.name = None
    return data 