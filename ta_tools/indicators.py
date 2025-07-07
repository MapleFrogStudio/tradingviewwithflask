import pandas as pd

def sma(price: pd.Series, period: int = 20) -> pd.Series:
    """ Simple Moving Average (SMA)"""
    return price.rolling(period).mean()

