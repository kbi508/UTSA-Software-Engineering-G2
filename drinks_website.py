#!/bin/python

import datetime
from flask import Flask, render_template
# Need to pip3 install flask-sqlalchemy
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:r00t4[m3]98@localhost/site.db'

@app.route('/')
def main():
    return render_template('main.html', utc_dt=datetime.datetime.utcnow())
    
@app.route('/about/')
def account():
    return render_template('account.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81)
