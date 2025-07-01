# webchart/__init__.py
# App Factory for flask (Registers blueprints fo rmodularity)

from flask import Flask

def create_app():
    app = Flask(__name__)

    # Register every flask module created here (example main, ai, dashboard, etc...)
    from webchart.chart import chart as chart_blueprint
    app.register_blueprint(chart_blueprint)

    return app



