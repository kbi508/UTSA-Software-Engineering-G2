import datetime
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html', utc_dt=datetime.datetime.utcnow())
    
@app.route('/about/')
def account():
    return render_template('account.html')

app.run(host='0.0.0.0', port=81)
