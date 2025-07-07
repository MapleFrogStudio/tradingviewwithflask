from dataclasses import dataclass
import pandas as pd
from webchart import create_app

@dataclass
class datas:
    symbol: str
    name: str
    prices: pd.DataFrame
    

app = create_app()


if __name__ == '__main__':
    app.run(debug=True)
    