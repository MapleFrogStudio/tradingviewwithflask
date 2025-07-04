import datetime
from flask import Blueprint, render_template
from webchart import data

main = Blueprint(
    'main', 
    __name__,
    template_folder='templates',
    static_folder='static'
)

@main.route('/')
def home():
    return render_template('index.html')    

@main.route('/demo')
def demo():
    prices = data.fake_prices_datetime() # Returns a valid Json compatible format for demo
    
     # Convert ISO time strings to datetime objects
    for p in prices:
        p['dt'] = datetime.datetime.fromisoformat(p['time'])

    # Sort prices by datetime just in case
    prices.sort(key=lambda x: x['dt'])

    # Compute 3-day SMA of the 'close' prices
    sma3 = []
    for i in range(2, len(prices)):
        avg = sum([prices[j]['close'] for j in range(i-2, i+1)]) / 3
        sma3.append({
            "time": prices[i]['time'],  # Keep same timestamp format
            "value": round(avg, 2)
        })

    # Remove 'dt' before sending to frontend
    for p in prices:
        p.pop('dt')
    
    
    payload = {
        "ticker": "AAPL",
        "prices": prices,
        "sma3": sma3
    }
    return render_template('demo.html', webdata=payload) 

@main.route('/chart')
def chart():
    df_prices = data.getPricesFromYahoo(['AAPL'])  # Fetches real data from Yahoo Finance
    json_prices = data.df_to_json(df_prices)  # Converts DataFrame to JSON format
    page_data = {
        "ticker": "AAPL",
        "prices": json_prices
    }
    return render_template('chart.html', webdata=page_data)    