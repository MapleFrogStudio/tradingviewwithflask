# webchart/chart/__init__.py
from flask import Blueprint

# Requires subfolder like this webchart/main/templates/main for default Flask template imports without having to use specific namespaces.
chart = Blueprint(
    'chart',
    __name__,
    template_folder='templates',
    static_folder='static',
    static_url_path='/chart/static'
)

from webchart.chart import routes

