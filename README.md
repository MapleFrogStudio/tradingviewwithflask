# Maple Frog Studio  
## Demo Lightweight Charts from TradingView
>**Warning**  
>Work in progress, not production ready, poor documentation :)   
  
Demo of using Tradingview's lightweight charts implemented in a Flask web project.   
See official TradingView APi Documentation : https://tradingview.github.io/lightweight-charts/docs/api    
See official TradingView Documentation - Release Notes : https://github.com/tradingview/lightweight-charts/releases  
 

Checkout the project [wiki](https://github.com/MapleFrogStudio/tradingviewwithflask/wiki) for in depth explanations.  

## Installation  
This installation process uses pyproject.toml instead of a requirements.txt file.  
Open a powershell console and type:
```  
> python --version  
> git clone https://github.com/MapleFrogStudio/tradingviewwithflask.git
> cd tradingviewwithflask
> python -m venv env
> .\env\Scripts\Activate  
> python -m pip install --upgrade pip
> pip install -e .
```
Also a good practice is to setup some environment variables to secure Flask. At the root of the project create a file named .env and add the following lines:  
```  
SECRET_KEY=somerandomstring
FLASK_ENV=development
FLASK_DEBUG=True
```


## Running Demo  
In the same Powershell console type:
> py run.py  

You will see a message similar to this  

![alt text](img/flaskip.png)  
CTRL-Click on the http://127.0.0.1:5000 to open the default page in your web browser. Follow the link to see a hard coded chart!


## Content
The index page: shows the data structure required for candlestick charts  
The /demo page: shows a simple chart with fake data  
The /chart page: show the chat view page with actual prices from Yahoo finance  