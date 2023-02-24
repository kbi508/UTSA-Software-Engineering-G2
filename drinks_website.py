import datetime
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', utc_dt=datetime.datetime.utcnow())

app.run(host='0.0.0.0', port=81)
'''
def index():
    return 'Hello World'

app.run(host='0.0.0.0', port=81)
'''