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
    payload = {
        "ticker": "AAPL",
        "prices": prices
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