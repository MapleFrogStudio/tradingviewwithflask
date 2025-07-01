# webchart/chart/routes__.py
from webchart.chart import chart
from flask import render_template

@chart.route('/')
def index():
    return render_template('chart/index.html')
