import json
import yfinance as yf
import pandas as pd
from datetime import date
from dateutil.relativedelta import relativedelta



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

if __name__ == '__main__':
    symbols = ['AAPL']
    
    data = getPricesFromYahoo(symbols=symbols)
    print(data)
    #print(data.index)
    #price_data = df_to_json(data)
    #print('--------------------')
    #print(price_data[:5])  # Print first 5 entries for verification
    #print('===================')
    #print(json.dumps(price_data[:5]))  # Convert to JSON format for further use

    #if data is not None:
    #    price_data = df_to_json(data)
    #    print(price_data[:5])  # Print first 5 entries for verification
    #else:
    #    print("No data returned for the given symbols.")